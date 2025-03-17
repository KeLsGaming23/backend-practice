import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const connectionPool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306
});

connectionPool.getConnection((err, connection) => {
    if(err){
        console.error("Failed to connect to database: ", err.message);
        return;
    }
    console.log("Database connection verified");
    connection.release();
});
export default connectionPool;