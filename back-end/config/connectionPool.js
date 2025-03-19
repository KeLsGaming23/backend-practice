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

connectionPool.getConnection((error, connection) => {
    if (error) {
        console.error("Failed to connect to the database: ", error.message);
        return;
    }

    console.log("Database connection verified");
    connection.release();
});
export default connectionPool;