import path from "path"
import { formatDocs, readDocs } from "./docs"
import { writeFile } from "./file-methods"
import { buildInvertedIndex } from "./build-inverted-index"

const entry = '../../contents/docs'
const selectedFolderPath = path.join(__dirname, entry)

export function main(){
  const docs = readDocs(selectedFolderPath)
  const formatedDocs = formatDocs(docs)
  const invertedIndex = buildInvertedIndex(formatedDocs)

  writeFile(formatedDocs, 'docs.json')
  writeFile(invertedIndex, 'inverted-index.json')
}

main()