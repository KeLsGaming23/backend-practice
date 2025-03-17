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

export {  connectionController }