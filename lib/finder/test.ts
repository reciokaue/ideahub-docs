import fs from "fs";
import path from "path";
import { normalizeText } from "./normalize-text";
import { Content } from "./content";
import { buildInvertedIndex } from "./build-inverted-index";

const entry = '../../contents/docs'
const specificFolder = '/'
const selectedFolderPath = path.join(__dirname, entry, specificFolder)
// let filenames = fs.readdirSync(selectedFolderPath);

// console.log("\nCurrent directory filenames:");
// filenames.forEach(file => {
//   console.log(file);
// });

export interface Document {
  id: number
  title: string
  description: string
  content: string
}

function getDocuments(filePath: string, documents: Document[]){
  if(filePath.slice(-9) === 'index.mdx')
    return

  const childrenFiles = fs.readdirSync(filePath)
  
  childrenFiles.forEach((filename, index) => 
    getDocuments(path.join(filePath, filename), documents)
  )

  if(childrenFiles.includes('index.mdx')){
    const docContent = getDoc(filePath)
    documents.push({
      id: documents.length,
      ...docContent
    })
  }
}

function getDoc(filePath: string){
  const { getTextBetween, content } = Content(filePath)
  const title = getTextBetween('title: ', 'description: ')
  const description = getTextBetween('description: ', '---')

  const document = {
    title,
    description,
    content,
  }
  
  return document
}

let myDocs: Document[] = []
getDocuments(selectedFolderPath, myDocs)


const invertedIndex = buildInvertedIndex(myDocs)

fs.writeFileSync(
  path.join(__dirname, 'invertedIndex.json'),
  JSON.stringify(invertedIndex, null, 2)
)
fs.writeFileSync(
  path.join(__dirname, 'docs.json'),
  JSON.stringify(myDocs, null, 2)
)
