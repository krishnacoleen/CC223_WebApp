const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let tasks = []; 

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const { task } = req.body;
    if (task) {
        tasks.push({ text: task, checked: false });
        res.status(201).json({ message: "Task added successfully" });
    } else {
        res.status(400).json({ message: "Task cannot be empty" });
    }
});

app.delete("/tasks/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        res.json({ message: "Task deleted successfully" });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

app.put("/tasks/:index", (req, res) => {
    const index = parseInt(req.params.index);
    if (index >= 0 && index < tasks.length) {
        tasks[index].checked = !tasks[index].checked;
        res.json({ message: "Task updated successfully" });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

/*
cd backend
node server.js
*/