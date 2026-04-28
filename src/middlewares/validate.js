import { validationResult } from "express-validator";
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const formattedErrors = errors.array().map((err) => ({
    field: err.path,
    message: err.msg,
  }));
  return res.status(422).json({
    error: "Validate fail",
    errors: formattedErrors,
  });
};

// Middleware riêng, đặt TRƯỚC patchTaskRules
export const requireAtLeastOneField = (req, res, next) => {
  console.log("body:", req.body);
  const { title, status } = req.body;
  console.log("title:", title, "| status:", status);
  if (!title && !status) {
    return res.status(400).json({
      error: "Phải có ít nhất một field để update",
    });
  }

  next();
};
