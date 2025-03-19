import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectionPool from '../config/connectionPool.js';

const registerUserController = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return json.status(404).json({ message: "All fields are required" });
        }
        const checkEmailQuery = "SELECT * FROM user_data WHERE email = ?";
        const checkUserNameQuery = "SELECT * FROM user_data WHERE username = ?";

        const [existingEmail] = await connectionPool.promise().query(checkEmailQuery, [email]);
        const [existingUserName] = await connectionPool.promise().query(checkUserNameQuery, [username]);

        if(existingEmail.length > 0){
            return res.status(404).json({ message: "Email already registered!!" });
        }
        if(existingUserName.length > 0){
            return res.status(404).json({ message: "Username already exist!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const insertUserQuery = "INSERT INTO user_data (username, email, password, date_created) VALUES (?, ?, ?, NOW())";
        await connectionPool.promise().query(insertUserQuery, [username, email, hashedPassword]);

        res.status(200).json({message: `Username: ${username} Successfully Registered`});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const loginUserController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(404).json({message: "Please input email and password"});
        }

        const userEmailQuery = "SELECT * FROM user_data WHERE email = ?";
        const [usersEmail] = await connectionPool.promise().query(userEmailQuery, [email]);
        if(usersEmail.length === 0){
            return res.status(404).json({message: "Invalid email"});
        }

        const user = usersEmail[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({message: "Invalid Password"});
        }

        const token = jwt.sign(
            {userId: user.id, username: user.username, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(200).json({message: `Welcom ${user.username} with email: ${user.email}`, token})
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server ERROR"});
    }
    
}

export {registerUserController, loginUserController}