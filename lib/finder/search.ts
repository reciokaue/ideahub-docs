import inverted from './inverted-index.json'
import docs from './docs.json'
import { markText } from './mark-text'
import "@/utils/string.extensions";

type InvertedIndex = {
  [key: string]: number[];
};
const invertedIndex: InvertedIndex = inverted;

export function searchText(text: string){
  if(text.length < 2) return []

  const normalizedWords = text
    .removeStopWords()
    .removeAccents()
    .toLowerCase()
    .split(' ')

  const docsMatching = normalizedWords.flatMap((word: string) => {
    const matchIndex = invertedIndex[word]
    return matchIndex || []
  })
  const matchUniques = [...new Set(docsMatching)]

  const pages = matchUniques.map((pageIndex) => {
    const page = docs[Number(pageIndex)]
    const description = findNearestMatch(page.content, normalizedWords)

    return {
      title: markText(page.title, normalizedWords),
      description: markText(description, normalizedWords),
      href: page.href
    }
  })

  return pages
}

export function findNearestMatch(text: string, words: string[], textLength = 20): string {
  const textWords = text.toLowerCase().removeAccents().split(' ');

  for (let i = 0; i < textWords.length; i++) {
    for (const word of words) {
      if (textWords[i].includes(word)) {
        const originalWords = text.split(' ')

        return originalWords.slice(
          (i < 4? 0: -4) + i, i+20
        ).join(' ');
      } 
    }
  }
  return text.split(' ').slice(0, 20).join(' ')
}