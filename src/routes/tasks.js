// src/routes/tasks.js
import { Router } from "express";
import { readData, writeData } from "../db.js";
import { logger } from "../events/logger.js";

const router = Router();

// GET /tasks?status=pending
router.get("/", async (req, res) => {
  const tasks = await readData();
  const { status } = req.query; // Express parse query string sẵn rồi

  const result = status ? tasks.filter((t) => t.status === status) : tasks;
  res.json(result); // thay sendJSON
});

// POST /tasks
router.post("/", async (req, res) => {
  const body = req.body; // Express parse JSON body sẵn rồi — không cần parseBody

  if (!body.title) {
    return res.status(400).json({ error: "title is required" });
  }

  const tasks = await readData();
  const newTask = {
    id: Date.now(),
    title: body.title,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  await writeData(tasks);
  logger.emit("task:event", { type: "task:created", data: newTask });

  res.status(201).json(newTask);
});

// GET /tasks/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id); // :id lấy bằng req.params
  const tasks = await readData();
  const task = tasks.find((t) => t.id === id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  res.json(task);
});

// PATCH /tasks/:id
router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const tasks = await readData();
  const task = tasks.find((t) => t.id === id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  const updated = { ...task, ...req.body, id }; // req.body thay parseBody
  const newTasks = tasks.map((t) => (t.id === id ? updated : t));
  await writeData(newTasks);
  logger.emit("task:event", { type: "task:updated", data: updated });

  res.json(updated);
});

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const tasks = await readData();
  const task = tasks.find((t) => t.id === id);

  if (!task) return res.status(404).json({ error: "Task not found" });

  const newTasks = tasks.filter((t) => t.id !== id);
  await writeData(newTasks);
  logger.emit("task:event", { type: "task:deleted", data: { id } });

  res.status(204).send(); // 204 = No Content — delete không trả body
});

export default router;
