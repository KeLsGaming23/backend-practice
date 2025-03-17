import connectionPool from "../config/connectionPool.js"


const connectionController = (req, res) => {
    connectionPool.getConnection((error, connection) => {
        if (error) {
            console.error("Failed to connect to the database: ", error.message);
            return;
        }
        console.log("Database connection verified!");
        connection.release();
        res.json({message: "Successfully connected to the database!"});
    });
}

export {connectionController}