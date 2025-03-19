import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectionPool from '../config/connectionPool.js';

const registerUserController = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(404).json({message: "All Field are required"});
        }

        const checkEmailQuery = "SELECT * FROM user_data WHERE email = ?";
        const checkUsernameQuery = "SELECT * FROM user_data WHERE username = ?";

        const [existingEmail] = await connectionPool.promise().query(checkEmailQuery, [email]);
        const [existingUserName] = await connectionPool.promise().query(checkUsernameQuery, [username]);
        
        if (existingEmail.length > 0) {
            return res.status(404).json({ message: "Email already registered" });
        }

        if (existingUserName.length > 0) {
            return res.status(404).json({message: "Username already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const insertUserQuery = "INSERT INTO user_data (username, email, password, date_created) VALUEs (?, ?, ?, NOW())";
        await connectionPool.promise().query(insertUserQuery, [username, email, hashedPassword]);

        res.status(200).json({message: `Username: ${username} Successfully Registered`});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error"});
    }
}

export {registerUserController}