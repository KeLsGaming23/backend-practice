import connectionPool from "../config/connectionPool.js";


const postController = async (req, res) => {
    try {
        const {title, description} = req.body;
        if (!title || !description) {
            return res.status(404).json({message: "Title and Description required"});
        }
        const postQuery = "INSERT INTO post_entry (title, description, date_created) VALUES (?, ?, NOW())";
        const [results] = await connectionPool.promise().query(postQuery, [title, description]);

        res.status(201).json({message: "Data Created", postId: results.insertId});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }
}

export default postController