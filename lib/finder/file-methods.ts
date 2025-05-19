import { readFileSync, writeFileSync } from "fs";
import path from "path";

export function readFile(filePath: string){
  return readFileSync(filePath, {
      encoding: 'utf8',
      flag: 'r'
    })
}
export function writeFile(file: Object, filename: string){
  return writeFileSync(
    path.join(__dirname, filename),
    JSON.stringify(file, null, 2)
  )
}
