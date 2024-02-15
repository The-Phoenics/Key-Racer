import { MAX_LINES_IN_ONE_PARA } from "./nodeGenerator.mjs"

const info = {
    currentLine: 0,
    currentWord: 0,
    currentLetter: 0,

    linesNodeList: null,
    numOfLines: null,

    wordsInCurrentLine: null,
    lettersInCurrentWord: null,

    currentLineElement: null,
    currentWordElement: null,
    currentLetterElement: null,

    hasFinished: function () {
        return this.currentLetter + 1 == this.lettersInCurrentWord &&
            this.currentWord + 1 == this.wordsInCurrentLine &&
            this.currentLine + 1 == this.numOfLines
    }
}

function resetInfo() {
    info.currentLine = 0
    info.currentWord = 0
    info.currentLetter = 0
}

//TODO: Refactor
function updateInfo() {
    info.linesNodeList = document.querySelectorAll('.line');
    info.numOfLines = info.linesNodeList.length

    // go to next word
    if (info.lettersInCurrentWord == info.currentLetter) {
        info.currentLetter = 0
        info.currentWord++
    }
    // go to next line
    if (info.wordsInCurrentLine == info.currentWord) {
        info.currentWord = 0
        info.currentLine++
    }
    if (info.linesNodeList.length == 0) {
        console.log(`There are no lines in content!`)
    } else {
        info.currentLineElement = info.linesNodeList[info.currentLine]
        info.currentWordElement = info.currentLineElement.childNodes[info.currentWord];
        info.currentLetterElement = info.currentWordElement.childNodes[info.currentLetter]

        info.wordsInCurrentLine = info.currentLineElement.childNodes.length
        info.lettersInCurrentWord = info.currentWordElement.childNodes.length
    }
}

function validate(pressedKeyChar) {
    let currentLetter = info.currentLetterElement.innerText.trim()
    if (pressedKeyChar == currentLetter)
        onCorrect(info.currentLetterElement)
    else
        onIncorrect(info.currentLetterElement)
}

export function updateViewContent(keyPressedCharacter) {
    if (!info.hasFinished()) {
        updateInfo()
        validate(keyPressedCharacter)
    } else {
        console.log('Finished!')
        // TODO: Changing the content once user finishes
    }
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
    if (letterElement) {
        letterElement.classList.add('incorrect')
        info.currentLetter++
    }
    else
        console.log('Invalid letter element!')
}