import connectionPool from "../config/connectionPool.js"


const connectionController = (req, res) => {
    connectionPool.getConnection((error, connection) => {
        if (error) {
            console.error("Failed to connect to the database: ", error.message);
            return;
        }
        console.log("Database connection verified!");
        connection.release();
        res.json({ message: "Successfully connected to the database!" });
    });
}

const getAllUserController = async (req, res) => {
    try {

        const getAllUserQuery = "SELECT * FROM users";
        const [results] = await connectionPool.promise().query(getAllUserQuery);
        if (results.length === 0) {
            return res.status(404).json({message: "No users found"});
        }
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({message: "Server Error"});
    }
}

export { connectionController, getAllUserController }