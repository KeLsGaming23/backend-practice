import connectionPool from "../config/connectionPool.js"


const connectionController = (req, res) => {
    connectionPool.getConnection((error, connection) => {
        if (error) {
            console.error("Failed to connect to the database: ", error.message);
            return;
        }

        console.log("Database connection verified");
        connection.release();
        res.json({ message: "Successfully connected to the database" });
    });
}
const getAllUsersController = async (req, res) => {
    try {
        const getAlluserQuery = "SELECT * FROM users";
        const [results] = await connectionPool.promise().query(getAlluserQuery);

        if (results.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}
const getOnlyUserNameAndIDController = async (req, res) => {
    try {
        const getAlluserQuery = "SELECT id, username FROM users";
        const [results] = await connectionPool.promise().query(getAlluserQuery);

        if (results.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
}

const getUserByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const getUserByIdQuery = "SELECT id, username FROM users WHERE id = ?";
        const [results] = await connectionPool.promise().query(getUserByIdQuery, [id])

        if (results.length === 0) {
            return res.status(404).json({message: "No users found"});
        }
        res.status(201).json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}
export { connectionController, getAllUsersController, getOnlyUserNameAndIDController, getUserByIdController }