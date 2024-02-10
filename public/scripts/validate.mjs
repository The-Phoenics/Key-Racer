import { MAX_LINES_IN_ONE_PARA } from "./nodeGenerator.mjs"

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

function resetInfo() {
    info.currentLine = 0
    info.currentWord = 0
    info.currentLetter = 0
}

function updateInfo() {
    info.linesNodeList = document.querySelectorAll('.line');
    
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
    
    if (info.linesNodeList.length == 0) {
        console.log(`There are no lines in content!`)
    } else {
        info.currentLineElement = info.linesNodeList[info.currentLine]
        info.currentWordElement = info.currentLineElement.childNodes[info.currentWord];
        info.currentLetterElement = info.currentWordElement.childNodes[info.currentLetter]

        info.currentLineNodeLength = info.currentLineElement.childNodes.length
        info.currentWordNodeLength = info.currentWordElement.childNodes.length
    }
}

function validate() {
    let correct = true
    if (correct)
        onCorrect(info.currentLetterElement)
    else
        onIncorrect(info.currentLetterElement)
}

export function updateViewContent() {
    const interval = setInterval(() => {
        if (info.currentLine == MAX_LINES_IN_ONE_PARA) {
            // paragraph finished
            resetInfo()
            clearInterval(interval)
        }
        updateInfo()
        validate()
    }, 50);
}

function onCorrect(letterElement) {
    if (letterElement) {
        letterElement.classList.add('correct')
        info.currentLetter++
    }
    else
        console.log('Invalid letter element!')
}

function onIncorrect(letterElement) {
    if (letterElement)
        letterElement.classList.add('incorrect')
    else
        console.log('Invalid letter element!')
}