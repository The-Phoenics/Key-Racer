
const maxWordsInOneLine = 17;
const maxLinesInOnePara = 6;

const spaceString = '\u00A0'
const newlineString = '\u000A'

export function generateNodesForContent(contentTxtElement, contentValue) {
    // lines
    const linesArray = contentValue.split('\n');
    linesArray.forEach((line) => {
        const lineElement = document.createElement('div');
        lineElement.classList.add('line');

        // words
        const wordsArray = line.split(' ');
        let loopIterationsForWords = wordsArray.length < maxWordsInOneLine ? wordsArray.length : maxWordsInOneLine;
        for (let i = 0; i < loopIterationsForWords; i++) {
            const wordElement = document.createElement('span');
            wordElement.classList.add('word');
            lineElement.appendChild(wordElement); // add words child element

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
    });
    console.log(contentTxtElement);
}