
const maxWordsInOneLine = 17;
const maxLinesInOnePara = 5;

const spaceString = '\u00A0'
const newlineString = '\u000A'

export function generateNodesForContent(contentTxtElement, contentValue) {
    // array of lines
    const linesArray = contentValue.split('\n');
    
    let loopIterationsForLines = Math.min(linesArray.length, maxLinesInOnePara);
    for (let k = 0; k < loopIterationsForLines; k++) {
        // create a new element for a line
        const lineElement = document.createElement('div');
        lineElement.classList.add('line');
        // text content of the line
        const line = linesArray.at(k)

        // array of words in that line
        const wordsArray = line.split(' ');
        let loopIterationsForWords = Math.min(wordsArray.length, maxWordsInOneLine);
        for (let i = 0; i < loopIterationsForWords; i++) {
            // create a new element for a word
            const wordElement = document.createElement('span');
            wordElement.classList.add('word');
            lineElement.appendChild(wordElement); // add word child element

            // letters
            const letterArray = wordsArray[i].split('');
            letterArray.forEach((letter, letterIndex) => {
                // letter
                const letterElement = document.createElement('span');
                letterElement.classList.add('letter');
                letterElement.classList.add('pending');
                if (letterIndex === letterArray.length - 1) {
                    letter += spaceString
                }
                letterElement.innerText = letter;
                wordElement.appendChild(letterElement);
            });
        }

        // wordsArray.every((word, wordIndex) => { });
        const newLineElement = lineElement.lastElementChild.lastElementChild;
        newLineElement.innerText = newLineElement.innerText + newlineString
        contentTxtElement.appendChild(lineElement);
    }
}