import connectionPool from "../config/connectionPool.js"


const connectionController = (req, res) => {
    connectionPool.getConnection((err, connection) => {
        if(err){
            console.error("Failed to connect to database: ", err.message);
            return;
        }

        console.log("Database connection verified");
        connection.release();
        res.json({ message: "Successfully connected to database"});
    });
}

const getAllUsersController = async(req, res) => {
    try {
        const getAllUserQuery = "SELECT * FROM users";
        const [results] = await connectionPool.promise().query(getAllUserQuery);
        if(results.length === 0){
            return res.status(400).json({error: "No users Found"});
        }
        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Server Error"});
    }
}

export {  connectionController, getAllUsersController }