import fs from "fs";

export async function readFile(file) {
  const content = JSON.parse(fs.readFileSync(file));
  return content;
}
