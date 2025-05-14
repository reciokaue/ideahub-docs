import { readFile } from "./read-file"

export function Content(path: string ){
  const bruteContent = readFile(path, 'index.mdx')
  const content = bruteContent.replace(/(\r\n|\n|\r)/gm, " ");

  function getTextBetween(firstSearchTerm: string, lastSearchTerm: string){
    const firstIndex = content.indexOf(firstSearchTerm) + firstSearchTerm.length
    const lastIndex = content.slice(firstIndex).indexOf(lastSearchTerm) + firstIndex

    if(firstIndex == -1 || lastIndex == -1)
      return 'not found'

    return content.slice(firstIndex , lastIndex).trim()
  }

  return {
    getTextBetween,
    content: content
  }
}
