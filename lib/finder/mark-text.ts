export function markText(text: string, words: string[]){
  let newText = text

  for (let index = 0; index < newText.length; index++) {
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const extractedWord = newText.slice(index, index + word.length)
      const testWord = removeDiacritics(extractedWord)

      if(word == testWord){
        newText = 
          newText.slice(0, index) +
          "<mark>" + extractedWord + "</mark>" +
          newText.slice(index + word.length)
        
        index += 13 + word.length //13 is <mark></mark> length
        break
      }
    }
  }
  return newText
}

function removeDiacritics(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
