import { body } from "express-validator";

export const createTaskRules = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),
  body("status")
    .optional()
    .isIn(["pending", "done"])
    .withMessage("Status must be pending or done"),
];

export const updateTaskRules = [
  body("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters"),
  body("status")
    .optional()
    .isIn(["pending", "done"])
    .withMessage("Status must be pending or done"),
];
