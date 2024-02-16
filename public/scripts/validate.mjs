export const INFO = {
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
        return this.currentLetter == this.lettersInCurrentWord &&
            this.currentWord + 1 == this.wordsInCurrentLine &&
            this.currentLine + 1 == this.numOfLines
    },

    isAtFirstLetterFirstLine: function () {
        return this.currentLetter == 0 &&
            this.currentWord == 0 &&
            this.currentLine == 0
    },
    
    isAtFirstLetterOfCurrentLine: function () {
        return this.currentLetter == 0 &&
            this.currentWord == 0
    },
    
    isAtFirstLetterOfWord: function () {
        return this.currentLetter == 0
    }
}

export function initLinesDataG() {
    INFO.linesNodeList = document.querySelectorAll('.line');
    INFO.numOfLines = INFO.linesNodeList.length
}

export function initInfoDataG() {
    INFO.currentLineElement = INFO.linesNodeList[INFO.currentLine]
    INFO.currentWordElement = INFO.currentLineElement.childNodes[INFO.currentWord];
    INFO.currentLetterElement = INFO.currentWordElement.childNodes[INFO.currentLetter]

    INFO.wordsInCurrentLine = INFO.currentLineElement.childNodes.length
    INFO.lettersInCurrentWord = INFO.currentWordElement.childNodes.length
}

export function updateViewContentG(keyPressedCharacter) {
    if (!INFO.hasFinished()) {
        updateInfo()
        validate(keyPressedCharacter)
    } else {
        console.log('Finished!')
        // resetInfo()
        // TODO: Changing the content once user finishes
    }
}

function resetInfo() {
    INFO.currentLine = 0
    INFO.currentWord = 0
    INFO.currentLetter = 0
    initLinesDataG()
}

//TODO: Refactor
function updateInfo() {
    // go to next word
    if (INFO.lettersInCurrentWord == INFO.currentLetter) {
        INFO.currentLetter = 0
        INFO.currentWord++
    }
    // go to next line
    if (INFO.wordsInCurrentLine == INFO.currentWord) {
        INFO.currentWord = 0
        INFO.currentLine++
    }
    if (INFO.linesNodeList.length == 0) {
        console.log(`There are no lines in content!`)
    } else {
        initInfoDataG()
    }
}

function validate(pressedKeyChar) {
    let currentLetter = INFO.currentLetterElement.innerText.trim()
    if (pressedKeyChar == currentLetter)
        onCorrect(INFO.currentLetterElement)
    else
        onIncorrect(INFO.currentLetterElement)
}

function onCorrect(letterElement) {
    if (letterElement) {
        letterElement.classList.add('correct')
        INFO.currentLetter++
    }
    else
        console.log('Invalid letter element!')
}

function onIncorrect(letterElement) {
    if (letterElement) {
        letterElement.classList.add('incorrect')
        INFO.currentLetter++
    }
    else
        console.log('Invalid letter element!')
}