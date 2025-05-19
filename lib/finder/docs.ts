import fs from "fs";
import path from "path";
import { readFile, writeFile } from "./file-methods"
import { pathToHref } from "./pathToHref";
import "@/utils/string.extensions";

export interface Document {
  id: number
  title: string
  href: string
  content: string
}

export function readDocs(pathname: string): string[]{
  const isFile = pathname.includes('.')
  if(isFile){
    let file = readFile(pathname)
    file = `path: ${pathname} ${file}`
    return [ file ]
  }

  const childrenPaths = fs.readdirSync(pathname)
  const childrenDocs = childrenPaths.flatMap((filename: string) => {
    const childPath = path.join(pathname, filename)
    return readDocs(childPath)
  })
  
  return childrenDocs
}

export function formatDocs(docs: string[]): Document[]{
  return docs.map((doc, index) => {
    const path = doc
      .getTextBetween('path:', 'title')
      .removeBreakLines()
      .trim()
    const title = doc
      .getTextBetween('title:', 'description')
      .removeBreakLines()
      .trim()
    const content = doc
      .getTextBetween('description: ')
      .removeBreakLines()
      .removeMarkdown()
      .trim()
    const href = pathToHref(path)

    return {
      id: index, title, content, href 
    }
  })
}

