import { readdirSync, readFileSync } from "fs";
import path from "path";

function readFolderFiles(folderPath: string) {
  try {
    // const files = readdirSync(path.join(__dirname, folderPath));
    const files = readdirSync(__dirname);
    const allFiles = files.map(file => path.join(folderPath, file));
    return allFiles;
  } catch (e) {
    console.error("Erro ao ler pasta:", e);
  }
}

function processFile(filePath: string) {
  const fileContent = readFileSync(filePath, 'utf-8');
  let title = "";
  let position: number[] = [];

  for (let index = 0; index < fileContent.length; index++) {
    if (fileContent.slice(index, index + 3) === '---') {
      if (position.length === 0) {
        position[0] = index + 3;
      } else {
        position[1] = index;
        title = fileContent.slice(...position);
        return title;
      }
    }
  }
}

const folders = readFolderFiles('../../content/docs/');
console.log(folders);

if (folders && folders.length > 0) {
  console.log(processFile(folders[0]));
}
