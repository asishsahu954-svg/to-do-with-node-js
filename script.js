const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// Serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

let tasks = [];
let id = 1;

// GET all tasks
app.get("/tasks", (req, res) => res.json(tasks));

// NEW: Add task route changed to /addTask
app.post("/addTask", (req, res) => {
  const taskText = req.body.task;
  if (!taskText) {
    return res.status(400).json({ message: "Task required" });
  }
  tasks.push({ id: id++, task: taskText, status: "Pending" });
  res.json({ message: "Task added successfully" });
});

// MARK DONE
app.put("/update/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) task.status = "Done";
  res.json({ message: "Task updated" });
});

// DELETE
app.delete("/delete/:id", (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
