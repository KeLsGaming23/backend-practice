import connectionPool from "../config/connectionPool.js";

export const connectionController = (req, res) => {

    connectionPool.getConnection((err, connection) => {

        if(err){
            console.error("Database connection failed:", err.message)
            return res.status(500).json({ message: "Database connection failed", error: err.message});
        }

        console.log("Database connection verified");
        connection.release();
        res.json({ message: "Connection to database is successful"});

    });

};