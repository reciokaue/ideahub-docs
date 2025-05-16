import { normalizeText } from './normalize-text'

import invertedIndex from './invertedIndex.json'
import docs from './docs.json'
import { markText } from './mark-text'

export function searchText(text: string){
  const normalizedText = normalizeText(text)

  const words = normalizedText.split(' ')
  const keys = Object.keys(invertedIndex)
  const matchKeys = keys.filter((key) => words.some((word) => key.includes(word)))
 
  const pagesContainingWords = matchKeys.map((key: string) =>
    invertedIndex[key]
  ).flat()
  
  const counts = new Map<string, number>();
  for (const element of pagesContainingWords) {
    const value = counts.get(element) || 0;
    counts.set(element, value + 1);
  }
  const uniques = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])  // ordena pelos valores
    .map(([key]) => key).slice(0, 1);         // pega só as chaves

  const pages = uniques.map((pageIndex: string) => {
    const page = docs[Number(pageIndex)]

    return {
      title: markText(page.title, words),
      description: markText(page.title, words),
    }
  })

  console.log(pages)
}

console.time('search')
searchText("App tela")
console.timeEnd('search')

