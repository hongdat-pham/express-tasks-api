import { TaskModel } from "./tasks.model.js";
import { AppError } from "../errors/AppError.js";

const taskModel = new TaskModel();

export class TasksService {
  async getAllTasks({ status, page = 1, limit = 10 }) {
    let tasks;

    if (status) {
      tasks = await taskModel.findByStatus(status);
    } else {
      tasks = await taskModel.findAll();
    }

    const total = tasks.length;
    const start = (page - 1) * limit;
    const data = tasks.slice(start, start + limit);

    return { data, total, page, limit };
  }

  async getTaskById(id) {
    const task = await taskModel.findById(id);
    if (!task) throw new AppError("Task not found", 404);
    return task;
  }

  async createTask(body) {
    const { title, status } = body;
    if (!title) throw new AppError("Title is required", 400);
    return taskModel.create({ title, status });
  }

  async updateTask(id, body) {
    const task = await taskModel.update(id, body);
    if (!task) throw new AppError("Task not found", 404);
    return task;
  }

  async deleteTask(id) {
    const deleted = await taskModel.delete(id);
    if (!deleted) throw new AppError("Task not found", 404);
  }
}
