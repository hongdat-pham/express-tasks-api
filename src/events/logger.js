import { EventEmitter } from "events";
import { appendFile, mkdir } from "fs/promises";

export const logger = new EventEmitter();

function timestamp() {
  return new Date().toISOString();
}

logger.on("task:event", ({ type, data }) => {
  console.log(`[${timestamp()}] ${type}`, data);
});

logger.on("task:event", async ({ type, data }) => {
  try {
    await mkdir("./logs", { recursive: true });
    const line = `[${timestamp()}] ${type} ${JSON.stringify(data)}\n`;
    await appendFile("./logs/events.log", line, "utf8");
  } catch (err) {
    console.error("Logger error:", err.message);
  }
});
