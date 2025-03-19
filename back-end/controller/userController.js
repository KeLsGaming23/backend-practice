import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectionPool from '../config/connectionPool.js';

const userRegisterController = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(403).json({message: "All Fields are required!"});
        }
        const checkEmailQuery = "SELECT * FROM user_data WHERE email = ?";
        const checkUserNameQuery = "SELECT * FROM user_data WHERE username = ?";

        const [emailExist] = await connectionPool.promise().query(checkEmailQuery, [email]);
        const [usernameExist] = await connectionPool.promise().query(checkUserNameQuery, [username]);

        if (emailExist.length > 0) {
            return res.status(403).json({message: "Email already register!"});
        }

        if (usernameExist.length > 0){
            return res.status(403).json({message: "Username is already taken"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const insertUserQuery = "INSERT INTO user_data (username, email, password, date_created) VALUES(?, ?, ?, NOW())";
        await connectionPool.promise().query(insertUserQuery, [username, email, hashedPassword]);

        res.status(201).json({message: `User: ${username} is successfully created`});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}

const loginUserController =async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(403).json({message: "All Fields are required"});
        }

        const checkUserEmailQuery = "SELECT * FROM user_data where email = ?";
        const [userEmail] = await connectionPool.promise().query(checkUserEmailQuery, [email]);

        if(userEmail.length === 0){
            return res.status(404).json({message: "No email found"});
        }

        const user = userEmail[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(403).json({message: "Password is incorrect"});
        }

        const token = jwt.sign(
            {userId: user.id, username: user.username, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(200).json({message: `Welcome ${user.username} with email: ${user.email}`, token});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}

export {userRegisterController, loginUserController}