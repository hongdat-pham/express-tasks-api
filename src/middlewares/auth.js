import config from "../config.js";
const auth = (req, res, next) => {
  const key = req.headers["x-api-key"];
  if (!key || key !== config.apiKey) {
    return res.status(401).json({ error: "Unauthorized: invalid API key" });
  }
  next();
};

export default auth;
