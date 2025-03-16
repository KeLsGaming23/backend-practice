import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();
//Create connection pool
const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306
});
//test database connection
connectionPool.getConnection((err, connection) => {

    if(err){
        console.error("Database connection failed on startup: ", err.message)
        return;
    }

    console.log("Connected to MYSQL successfully:");
    connection.release();

});

export default connectionPool;