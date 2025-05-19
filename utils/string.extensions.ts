import stopwords from '../lib/finder/stopwords.json'

declare global {
  interface String {
    removeStopWords(): string;
    removeBreakLines(): string;
    removeMarkdown(): string;
    removeAccents(): string
    removeNumbers(): string
    getTextBetween(firstTerm: string, lastTerm?: string): string
  }
}

String.prototype.removeStopWords = function () {
  return this
    .split(' ')
    .filter((word: string) => !stopwords.includes(word))
    .join(' ');
};
String.prototype.removeBreakLines = function () {
  return this
    .replace(/(\r\n|\n|\r)/gm, ' ') // quebras de linha
    .replace(/\s+/g, ' ') // múltiplos espaços
};
String.prototype.removeAccents = function () {
  return this
    .normalize('NFD') // separa letras de acentos
    .replace(/[\u0300-\u036f]/g, '') // remove os acentos
    .replace(/[^\w\s]/gi, '') // remove todos caracteres especiais
};
String.prototype.removeMarkdown = function () {
  return this
    .replace(/```[\s\S]*?```/g, '') // blocos de código
    .replace(/`[^`\n]+`/g, '') // código inline
    .replace(/!\[.*?\]\(.*?\)/g, '') // imagens ![alt](url)
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // links -> só mantém o texto
    .replace(/#+\s?/g, '') // remove apenas os # dos títulos
    .replace(/^\s*>.*/gm, '') // blockquotes
    .replace(/[*_~/]/g, '') // marcações como **, __, ~~ etc (mas evita tirar hífens normais)
    .replace(/<\s*\/?\s*\w+[^>]*>/g, '') // tags tipo <Note> ou </Note>
    .replace(/[-]{2,3}/g, '') // -- 
    .replace(/[\/\\]/g, '')
};
String.prototype.removeNumbers = function () {
  return this
    .replace(/[0-9]/g, '') // remove todos os numeros
};

String.prototype.getTextBetween = function (
  firstTerm: string,
  lastTerm?: string
){
  const firstIndex = this.indexOf(firstTerm) + firstTerm.length
  const lastIndex = lastTerm?
    this.slice(firstIndex).indexOf(lastTerm) + firstIndex:
    this.length

  if(firstIndex == -1 || lastIndex == -1)
    return 'not found'

  return this.slice(firstIndex , lastIndex).trim()
}
