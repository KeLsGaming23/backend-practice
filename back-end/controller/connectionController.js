import connectionPool from "../config/connectionPool.js";

const connectionController = (req, res) => {

    connectionPool.getConnection((err, connection) => {

        if (err) {
            console.error("Database connection failed:", err.message)
            return res.status(500).json({ message: "Database connection failed", error: err.message });
        }

        console.log("Database connection verified");
        connection.release();
        res.json({ message: "Connection to database is successful" });

    });

};
const getAllUsersController = async(req, res) => {
    try {
        const getAllUserQuery = "SELECT * FROM users";
        const [results] = await connectionPool.promise().query(getAllUserQuery);
        if (results.length === 0) {
            return res.status(404).json({message: "No user found"});
        }
        res.status(200).json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}

const getOnlyUserNameAndIdController = async(req, res) => {
    try {
        const getAllUserQuery = "SELECT id, username FROM users";
        const [results] = await connectionPool.promise().query(getAllUserQuery);
        if (results.length === 0) {
            return res.status(404).json({message: "No user found"});
        }
        res.status(200).json(results)
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}
export { connectionController, getAllUsersController, getOnlyUserNameAndIdController }