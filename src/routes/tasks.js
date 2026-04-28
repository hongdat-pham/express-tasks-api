// src/routes/tasks.js
import { Router } from "express";
import { readData, writeData } from "../db.js";
import { logger } from "../events/logger.js";
import { body } from "express-validator";
import { validate, requireAtLeastOneField } from "../middlewares/validate.js";

const router = Router();

const createTaskRules = [
  body("title")
    .notEmpty()
    .withMessage("Title là bắt buộc")
    .isLength({ min: 3 })
    .withMessage("Title phải có ít nhất 3 ký tự"),
  body("status")
    .optional()
    .isIn(["pending", "done"])
    .withMessage("Status phải là 'pending' hoặc 'done'"),
];

const patchTaskRules = [
  body("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Title phải có ít nhất 3 ký tự"),
  body("status")
    .optional()
    .isIn(["pending", "done"])
    .withMessage("Status phải là 'pending' hoặc 'done'"),
];

// GET /tasks?status=pending
router.get("/", async (req, res) => {
  const tasks = await readData();
  const { status } = req.query;
  const result = status ? tasks.filter((t) => t.status === status) : tasks;
  res.json(result);
});

// POST /tasks
router.post("/", createTaskRules, validate, async (req, res) => {
  const tasks = await readData();
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    status: req.body.status || "pending",
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  await writeData(tasks);
  logger.emit("task:event", { type: "task:created", data: newTask });
  res.status(201).json(newTask);
});

// GET /tasks/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const tasks = await readData();
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// PATCH /tasks/:id
router.patch(
  "/:id",
  requireAtLeastOneField,
  patchTaskRules,
  validate,
  async (req, res) => {
    const id = Number(req.params.id);
    const tasks = await readData();
    const task = tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    const updated = { ...task, ...req.body, id };
    const newTasks = tasks.map((t) => (t.id === id ? updated : t));
    await writeData(newTasks);
    logger.emit("task:event", { type: "task:updated", data: updated });
    res.json(updated);
  },
);

// DELETE /tasks/:id
router.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const tasks = await readData();
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  const newTasks = tasks.filter((t) => t.id !== id);
  await writeData(newTasks);
  logger.emit("task:event", { type: "task:deleted", data: { id } });
  res.status(204).send();
});

export default router;
