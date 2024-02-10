
const info = {
    currentLine: 0,
    currentWord: 0,
    currentLetter: 0,

    linesNodeList: null,

    currentLineNodeLength: null,
    currentWordNodeLength: null,

    currentLineElement: null,
    currentWordElement: null,
    currentLetterElement: null,
}

const MAX_LINES = 6

function resetInfo() {
    info.currentLine = 0
    info.currentWord = 0
    info.currentLetter = 0
}

function updateInfo() {
    info.linesNodeList = document.querySelectorAll('.line');
    if (info.linesNodeList.length == 0) {
        console.log(`There are no lines in content!`)
    } else {
        info.currentLineElement = info.linesNodeList[info.currentLine]
        info.currentWordElement = info.currentLineElement.childNodes[info.currentWord];
        info.currentLetterElement = info.currentWordElement.childNodes[info.currentLetter]
        // ---
        info.currentLineNodeLength = info.currentLineElement.childNodes.length
        info.currentWordNodeLength = info.currentWordElement.childNodes.length
        
        /*
console.log(`line length: ${info.currentLineNodeLength}
word length: ${info.currentWordNodeLength}
current letter: ${info.currentLetter}
current word: ${info.currentWord}`)
*/
    }
}

export function validate() {
    const interval = setInterval(() => {
        if (info.currentLine == MAX_LINES) {
            resetInfo()
            clearInterval(interval)
            console.log('done!')
        }
        updateInfo()
        if (info.currentLine != 5 && isEven(getRandom()))
            onCorrect(info.currentLetterElement)
        else
            onIncorrect(info.currentLetterElement)
        
        info.currentLetter++
        if (info.currentWordNodeLength == info.currentLetter) {
            info.currentLetter = 0
            info.currentWord++
        }
        if (info.currentLineNodeLength == info.currentWord) {
            info.currentWord = 0
            info.currentLine++
        }
        if (info.currentWordNodeLength == info.currentLineNodeLength)
            info.currentWord = 0
    }, 150);
}

function onCorrect(letterElement) {
    if (letterElement)
        letterElement.classList.add('correct')
    else
        console.log('Invalid letter element!')
}

function onIncorrect(letterElement) {
    if (letterElement)
        letterElement.classList.add('incorrect')
    else
        console.log('Invalid letter element!')
}

function getRandom() {
    return Math.floor(Math.random() * 10);
}

function isEven(num) {
    return num % 2 == 0;
}