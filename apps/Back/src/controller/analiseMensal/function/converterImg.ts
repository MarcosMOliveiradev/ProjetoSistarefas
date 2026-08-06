import fs from "node:fs"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename)

export function imageToBase64(fileName: string) {
  const filePath = resolve(__dirname, "../../assets", fileName)

  const image = fs.readFileSync(filePath)

  return `data:image/png;base64,${image.toString("base64")}`
}