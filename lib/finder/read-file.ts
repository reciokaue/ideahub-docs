import { readFileSync } from "fs";
import path from "path";

export function readFile(filePath: string, filename: string){
  return readFileSync(
    path.join(filePath, filename),{
      encoding: 'utf8',
      flag: 'r'
    })
}
