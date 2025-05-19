import { Document } from "./docs";

export function buildInvertedIndex(docs: Document[]) {
  const index:any = {};

  docs.forEach(document => {
    const words = `${document.title} ${document.content}`
      .toLowerCase()
      .removeAccents()
      .removeNumbers()
      .removeStopWords()
      .split(/\s+/);

    const uniqueWords = new Set(words);

    uniqueWords.forEach(word => {
      if (!index[word]) 
        index[word] = [];

      index[word].push(document.id);
    })

    return index;
  })
  console.log("inverted index size: ", Object.keys(index).length)

  return index
}
