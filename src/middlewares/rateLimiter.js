const requests = {};
const LIMIT = 10; // Tối đa 10 request
const WINDOW = 60 * 1000; // 1 phút = 60,000ms

const rateLimiter = (req, res, next) => {
  const ip = req.ip; // Lấy IP của client
  const now = Date.now(); // Thời điểm hiện tại

  // Nếu IP này chưa có trong sổ → tạo mới
  if (!requests[ip]) {
    requests[ip] = {
      count: 1,
      resetTime: now + WINDOW, // 1 phút kể từ bây giờ
    };
    return next();
  }

  // Nếu đã qua 1 phút → reset lại
  if (now > requests[ip].resetTime) {
    requests[ip] = {
      count: 1,
      resetTime: now + WINDOW,
    };
    return next();
  }

  // Chưa hết 1 phút → tăng count lên
  requests[ip].count += 1;

  // Quá 10 request → chặn
  if (requests[ip].count > LIMIT) {
    return res.status(429).json({ error: "Too many requests, slow down!" });
  }
  next();
};

export default rateLimiter;
