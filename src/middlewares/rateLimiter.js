const requests = {};
const LIMIT = 10;
const WINDOW = 60 * 1000;

const rateLimiter = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!requests[ip]) {
    requests[ip] = {
      count: 1,
      resetTime: now + WINDOW,
    };
    return next();
  }

  if (now > requests[ip].resetTime) {
    requests[ip] = {
      count: 1,
      resetTime: now + WINDOW,
    };
    return next();
  }

  requests[ip].count += 1;

  if (requests[ip].count > LIMIT) {
    return res.status(429).json({ error: "Too many requests, slow down!" });
  }
  next();
};

export default rateLimiter;
