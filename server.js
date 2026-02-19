const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("./db");   // ← missing in your code

const app = express();
app.use(express.json());

const PORT = 5000;
const SECRET_KEY = "secretkey";

// Dummy user
const user = {
    id: 1,   // added id
    email: "test@gmail.com",
    password: "1234"
};

// Root route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// LOGIN route
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === user.email && password === user.password) {
        const token = jwt.sign(
            { id: user.id, email: user.email },  // include id
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        return res.json({
            message: "Login successful",
            token: token
        });
    } else {
        return res.status(401).json({ error: "Invalid credentials" });
    }
});

// Middleware to verify token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({ error: "Token required" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, SECRET_KEY, (err, decodedUser) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired token" });
        }

        req.user = decodedUser;
        next();
    });
}

// Protected route
app.get("/profile", authenticateToken, (req, res) => {
    res.json({
        message: "Welcome to protected profile",
        user: req.user
    });
});


// ================= TASK ROUTES =================

// Add task
app.post("/tasks", authenticateToken, (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    const sql = "INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)";
    db.query(sql, [userId, title, description], (err, result) => {
        if (err) return res.status(500).json({ error: "DB error" });
        res.json({ message: "Task added successfully" });
    });
});

// Get tasks
app.get("/tasks", authenticateToken, (req, res) => {
    const userId = req.user.id;

    const sql = "SELECT * FROM tasks WHERE user_id = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: "DB error" });
        res.json(results);
    });
});

// Update task
app.put("/tasks/:id", authenticateToken, (req, res) => {
    const taskId = req.params.id;
    const { title, description, status } = req.body;
    const userId = req.user.id;

    const sql = `
        UPDATE tasks 
        SET title = ?, description = ?, status = ?
        WHERE id = ? AND user_id = ?
    `;

    db.query(sql, [title, description, status, taskId, userId], (err, result) => {
        if (err) return res.status(500).json({ error: "DB error" });
        res.json({ message: "Task updated" });
    });
});

// Delete task
app.delete("/tasks/:id", authenticateToken, (req, res) => {
    const taskId = req.params.id;
    const userId = req.user.id;

    const sql = "DELETE FROM tasks WHERE id = ? AND user_id = ?";
    db.query(sql, [taskId, userId], (err, result) => {
        if (err) return res.status(500).json({ error: "DB error" });
        res.json({ message: "Task deleted" });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
