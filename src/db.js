import { readFile, writeFile } from "fs/promises";

const DB_PATH = "./data/tasks.json";

export async function readData() {
  try {
    const raw = await readFile(DB_PATH, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

export async function writeData(data) {
  await writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf8");
}
