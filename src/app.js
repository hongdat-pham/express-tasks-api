// src/app.js
import express from "express";
import tasksRouter from "./routes/tasks.js";
import config from "./config.js";

const app = express();

app.use(express.json()); // bắt buộc phải có — không có cái này thì req.body = undefined

app.get("/", (req, res) => {
  res.json({
    name: config.appName,
    version: "1.0.0",
    endpoints: [
      "GET /tasks",
      "GET /tasks?status=pending",
      "POST /tasks",
      "GET /tasks/:id",
      "PATCH /tasks/:id",
      "DELETE /tasks/:id",
    ],
  });
});

app.use("/tasks", tasksRouter);

export default app;
