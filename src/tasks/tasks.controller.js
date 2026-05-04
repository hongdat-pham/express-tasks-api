import { catchAsync } from "../utils/catchAsync.js";
import { TasksService } from "./tasks.service.js";

const tasksService = new TasksService();

export class TasksController {
  getAll = catchAsync(async (req, res) => {
    const { status, page, limit } = req.query;
    const result = await tasksService.getAllTasks({
      status,
      page: Number(page) || 1,
      limit: Number(limit) || 10,
    });
    res.json(result);
  });

  getOne = catchAsync(async (req, res) => {
    const task = await tasksService.getTaskById(req.params.id);
    res.json(task);
  });

  create = catchAsync(async (req, res) => {
    const task = await tasksService.createTask(req.body);
    res.status(201).json(task);
  });

  update = catchAsync(async (req, res) => {
    const task = await tasksService.updateTask(req.params.id, req.body);
    res.json(task);
  });

  remove = catchAsync(async (req, res) => {
    await tasksService.deleteTask(req.params.id);
    res.status(204).send();
  });
}
