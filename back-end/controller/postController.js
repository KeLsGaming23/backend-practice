import connectionPool from "../config/connectionPool.js";


const postController = async (req, res) => {
    try { // Debugging log
        const { title, description } = req.body;

        //validate
        if (!title || !description) {
            return res.status(400).json({ message: "Title and Description is required" });
        }
        const insertIntoQuery = "INSERT INTO post_entry (title, description, date_created) VALUES (?, ?, NOW())";
        const [result] = await connectionPool.promise().query(insertIntoQuery, [title, description]);

        res.status(201).json({ message: "Post created successfully", postId: result.insertId });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Server Error" });
    }
}

export { postController }