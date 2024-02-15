
export const MAX_WORDS_IN_ONE_LINE = 17;
export const MAX_LINES_IN_ONE_PARA = 6;

const spaceString = '\u00A0'
const newlineString = '\u000A'

export function generateNodesForContent(contentTxtElement, contentValue) {
    // array of lines
    const linesArray = contentValue.split('\n');    
    let lineItrLimit = Math.min(linesArray.length, MAX_LINES_IN_ONE_PARA);
    for (let i = 0; i < lineItrLimit; i++) {
        const lineElement = getLineElement()
        // text content of the line
        let line = linesArray.at(i)
        line = line.trim()

        // array of words in that line
        const wordsInCurrentLine = line.split(' ').length
        let wordItrLimit = Math.min(wordsInCurrentLine, MAX_WORDS_IN_ONE_LINE);

        const wordsArray = line.split(' ', wordItrLimit);
        for (let j = 0; j < wordItrLimit; ++j) {
            const wordElement = getWordElement()
            lineElement.appendChild(wordElement);
            // letters
            const letterArray = wordsArray[j].split('');
            createLetterNodesFromWord(letterArray, wordElement)
        }
        contentTxtElement.appendChild(lineElement);
    }
}

function createLetterNodesFromWord(letterArray, wordNodeElement) {
    letterArray.forEach((letter, letterIndex) => {
        let letterElement = getLetterElement()
        if (letterIndex === letterArray.length - 1) {
            // add white space at end of last letter
            letter += spaceString
        }
        letterElement.innerText = letter;
        // add letter node element to parent word element
        wordNodeElement.appendChild(letterElement);
    });
}

function getLetterElement() {
    // letter element
    const letterElement = document.createElement('span');
    letterElement.classList.add('letter');
    letterElement.classList.add('pending');
    return letterElement;
}

function getWordElement() {
    // word element 
    const wordElement = document.createElement('span');
    wordElement.classList.add('word');
    return wordElement;
}

function getLineElement() {
    // letter element
    const lineElement = document.createElement('div');
    lineElement.classList.add('line');
    return lineElement;
}