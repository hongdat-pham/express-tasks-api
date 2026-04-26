const errorHandler = (err, req, res, next) => {
  console.log(`[ERROR]: ${err.message}`);
  res
    .status(err.statusCode || 500)
    .json({ err: err.message || "Internal Server Error" });
};

export default errorHandler;
