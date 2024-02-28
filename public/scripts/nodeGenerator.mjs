import { appendNextSiblingChild} from "./utils.mjs";

export const MAX_WORDS_IN_ONE_LINE = 12;
export const MAX_LINES_IN_ONE_PARA = 5;

const SPACE_UNICODE_VALUE = '\u00A0'

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
        // remove space node element at the end of line
        lineElement.removeChild(lineElement.lastChild);
        contentTxtElement.appendChild(lineElement);
    }
}

function createLetterNodesFromWord(letterArray, wordNodeElement) {
    letterArray.forEach((letter, letterIndex) => {
        let letterElement = getLetterElement()
        if (letterIndex === letterArray.length - 1) {
            // add white space at end of last letter
            // letter += SPACE_UNICODE_VALUE

            // add space circle element
            appendNextSiblingChild(getSpaceElement(), wordNodeElement);
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

function getSpaceElement() {
    // space circle element node    
    const spaceElement = document.createElement('span');
    spaceElement.classList.add('space-element');

    const spaceCircleElement = document.createElement('span');
    spaceCircleElement.classList.add('space-circle');
    spaceCircleElement.classList.add('pending');
    
    spaceElement.appendChild(spaceCircleElement)
    return spaceElement;
}