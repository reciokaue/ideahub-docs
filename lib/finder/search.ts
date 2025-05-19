import invertedIndex from './inverted-index.json'
import docs from './docs.json'
import { markText } from './mark-text'
import "@/utils/string.extensions";

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

// searchText('Tela lousa')





// export function searchText(text: string){
  // if(text.length < 2)
  //   return []

//   const normalizedText = normalizeText(text)
//   const words = normalizedText.split(' ')
//   const keys = Object.keys(invertedIndex)
//   const matchKeys = keys.filter((key) => words.some((word) => key.includes(word)))
 
//   const pagesContainingWords = matchKeys.map((key: string) =>
//     invertedIndex[key]
//   ).flat()
  
//   const counts = new Map<string, number>();
//   for (const element of pagesContainingWords) {
//     const value = counts.get(element) || 0;
//     counts.set(element, value + 1);
//   }
//   const uniques = [...counts.entries()]
//     .sort((a, b) => b[1] - a[1])  // ordena pelos valores
//     .map(([key]) => key);         // pega só as chaves

//   const pages = uniques.map((pageIndex: string) => {
    // const page = docs[Number(pageIndex)]
    // const description = findNearestMatch(page.content, words)

    // return {
    //   title: markText(page.title, words),
    //   description: markText(description.length > 0?
    //     description: page.description,
    //   words),
    //   href: page.href
    // }
  // })

//   return pages
// }

export function findNearestMatch(text: string, words: string[], textLength = 20): string {
  const textWords = text.toLowerCase().removeAccents().split(' ');

  for (let i = 0; i < textWords.length; i++) {
    for (const word of words) {
      if (textWords[i].includes(word)) {
        const originalWords = text.split(' ')
        const size = originalWords.length

        return originalWords.slice(
          (i < 4? 0: -4) + i, i+20
        ).join(' ');
        

        // const center = i + (Math.floor(Math.random() * 10) - 2);
        
        // const half = Math.floor(textLength / 2);
        // let start = center - half;
        // let end = center + half + (textLength % 2 === 0 ? 0 : 1);

        // if (start < 0) {
        //   end += Math.abs(start);
        //   start = 0;
        // }

        // if (end > textWords.length) {
        //   const overflow = end - textWords.length;
        //   start = Math.max(0, start - overflow);
        //   end = textWords.length;
        // }

        // return textWords.slice(start, end).join(' ');
      }
    }
  }
  // return textWords.slice(0, 20).join(' ');
  return "MACACO"
}