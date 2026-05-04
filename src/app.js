import express from "express";
import tasksRouter from "./routes/tasks.js";
import usersRouter from "./routes/users.js";
import config from "./config.js";
import logger from "./middlewares/logger.js";
import auth from "./middlewares/auth.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import { AppError } from "./errors/AppError.js";

const app = express();
app.use(logger);
app.use(express.json());
app.use(auth);
app.use(rateLimiter);

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
app.use("/users", usersRouter);
app.get("/error-test", (req, res, next) => {
  const err = new Error("Something went wrong!");
  err.statusCode = 500;
  next(err);
});
app.use((req, res, next) => {
  next(new AppError(`Route not found: ${req.url}`, 404));
});
app.use(errorHandler);

export default app;
