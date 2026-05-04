import { Router } from "express";
import { TasksController } from "./tasks.controller.js";
import { createTaskRules, updateTaskRules } from "./tasks.validation.js";
import { validate } from "../middlewares/validate.js";

const router = Router();
const ctrl = new TasksController();

router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getOne);
router.post("/", createTaskRules, validate, ctrl.create);
router.patch("/:id", updateTaskRules, validate, ctrl.update);
router.delete("/:id", ctrl.remove);

export default router;
