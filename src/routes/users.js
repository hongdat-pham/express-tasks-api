import { Router } from "express";
import { readData } from "../db.js";

const router = Router();
router.get("/:userId/tasks", async (req, res) => {
  const tasks = await readData();
  const userId = Number(req.params.userId);
  const filtered = tasks.filter((t) => t.userId === userId);

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const data = filtered.slice(skip, skip + limit);

  res.status(200).json({ data, total: filtered.length, page, limit });
});
export default router;
