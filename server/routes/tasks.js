const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new task
router.post("/tasks", async (req, res) => {
  const { task_name, description, due_date, priority, category } = req.body;

  try {
    const insertTaskQuery = `
      INSERT INTO tasks (task_name, description, due_date, priority, category) 
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *
      `;

    const { rows } = await db.query(insertTaskQuery, [task_name, description, due_date, priority, category]);

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update task by ID
router.put("/tasks/:id", async (req, res) => {
  const taskId = req.params.id;
  const { task_name, description, due_date, priority, category } = req.body;

  try {
    // Define the SQL query to update the task based on its ID
    const updateTaskQuery = `
        UPDATE tasks
        SET task_name = $1, description = $2, due_date = $3, priority = $4, category = $5
        WHERE id = $6
        RETURNING *
      `;


    const result = await db.query(updateTaskQuery, [
      task_name,
      description,
      due_date,
      priority,
      category,
      taskId,
    ]);

    if (result.rowCount === 1) {
      // Task was successfully updated
      const updatedTask = result.rows[0];
      res.json(updatedTask);
    } else {
      // Task with the given ID was not found
      res.status(404).json({ error: "Task not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete task by ID
router.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    const deleteTaskQuery = `DELETE FROM tasks WHERE id = $1`;

    // Execute the query with the task ID
    const result = await db.query(deleteTaskQuery, [taskId]);

    if (result.rowCount === 1) {
      // Task was successfully deleted
      res.status(204).send(); // Respond with no content (204 status code)
    } else {
      // Task with the given ID was not found
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
