## Backend initial setup
## Backend Setup – Express with MySQL

This is my preferred setup when creating a new **backend project** using **Node.js, Express, and MySQL**.

### **1️⃣ Initial Setup**

Before starting, if you're using GitHub, create a `.gitignore` file and add the following lines to prevent unnecessary files from being pushed to the repository:

    /node_modules/  
    /.env  
 2️⃣ Create a Backend Folder (If Not Created Yet)

     mkdir back-end
	 cd back-end

3️⃣ Initialize the Project

    npm init -y

4️⃣ Install Dependencies

    npm i express mysql2 nodemon cors dotenv

### **5️⃣ Create `index.js` and Update `package.json`**

Modify `package.json` to include `"type": "module"` under `"main": "index.js"`.  
The updated `package.json` should look like this:

    {
      "name": "back-end",
      "version": "1.0.0",
      "description": "",
      "main": "index.js",
      "type": "module",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon index.js"
      },
      "dependencies": {
        "cors": "^latest",
        "dotenv": "^latest",
        "express": "^latest",
        "mysql2": "^latest",
        "nodemon": "^latest"
      }
    }

### **6️⃣ Create a Simple Express Server**

Inside `index.js`, add the following code to create a basic Express server that listens on port **8800**:

    import express from "express";
    
    const app = express();
    
    app.listen(8800, () => {
        console.log("Connected to backend");
    });
### **7️⃣ Import `cors` and `mysql2`, and Create a MySQL Connection Pool**

Modify `index.js` to include **middleware**, **database connection**, and an **API endpoint** for testing the connection.

    import express from "express";
    import mysql from "mysql2";
    import cors from "cors";
    import dotenv from "dotenv";
    
    // Load environment variables
    dotenv.config();
    
    const app = express();
    
    // Middleware
    app.use(express.json());
    app.use(cors());
    
    // Database connection pool
    const db = mysql.createPool({
        connectionLimit: process.env.DB_CONNECTION_LIMIT, 
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    
    // Default API route to test MySQL connection
    app.get("/", (req, res) => {
        res.json("Hello, this is the backend!");
    });
    
    app.listen(8800, () => {
        console.log("Connected to backend");
    });
