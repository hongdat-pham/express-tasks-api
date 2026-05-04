import { readFile, writeFile } from "fs/promises";
import { randomUUID } from "crypto";

const DB_PATH = "./data/tasks.json";

export class TaskModel {
  async findAll() {
    try {
      const raw = await readFile(DB_PATH, "utf8");
      return JSON.parse(raw);
    } catch (err) {
      if (err.code === "ENOENT") return [];
      throw err;
    }
  }

  async findById(id) {
    const tasks = await this.findAll();
    return tasks.find((t) => t.id === id) || null;
  }

  async findByStatus(status) {
    const tasks = await this.findAll();
    return tasks.filter((t) => t.status === status);
  }

  async create(data) {
    const tasks = await this.findAll();
    const newTask = {
      id: randomUUID(),
      title: data.title,
      status: data.status || "pending",
      createdAt: new Date().toISOString(),
    };
    tasks.push(newTask);
    await writeFile(DB_PATH, JSON.stringify(tasks, null, 2));
    return newTask;
  }

  async update(id, data) {
    const tasks = await this.findAll();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...data };
    await writeFile(DB_PATH, JSON.stringify(tasks, null, 2));
    return tasks[index];
  }

  async delete(id) {
    const tasks = await this.findAll();
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    await writeFile(DB_PATH, JSON.stringify(tasks, null, 2));
    return true;
  }
}
