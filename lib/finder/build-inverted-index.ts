import { normalizeText } from "./normalize-text";
import { Document } from "./test";

export function buildInvertedIndex(docs: Document[]) {
  const index:any = {};

  docs.forEach(document => {
      const words = normalizeText(document.content).split(/\s+/);
      const uniqueWords = new Set(words);
  
      uniqueWords.forEach(word => {
        if (!index[word]) {
          index[word] = [];
        }
        index[word].push(document.id);
      })
  
      return index;
  })

  return index
}
