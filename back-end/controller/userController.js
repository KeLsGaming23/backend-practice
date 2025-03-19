import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectionPool from '../config/connectionPool.js';

const registerUserController = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(404).json({message: "All fields required!"});
        }
        const checkEmailQuery = "SELECT * FROM user_data WHERE email = ?";
        const checkUserNameQuery = "SELECT * FROM user_data WHERE username = ?";

        const [emailExist] =  await connectionPool.promise().query(checkEmailQuery, [email]);
        const [usernameExist] = await connectionPool.promise().query(checkUserNameQuery, [username]);

        if (emailExist.length > 0) {
            return res.status(404).json({message: "Email already registered!"});
        } else if(usernameExist.length > 0) {
            return res.status(404).json({message: "Username already exist!"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const insertUserQuery = "INSERT INTO user_data (username, email, password, date_created) VALUES (?, ?, ?, NOW())";
        await connectionPool.promise().query(insertUserQuery, [username, email, hashedPassword]);

        res.status(200).json({message: `User: ${username} is Successfully registered.`});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}

export {registerUserController}