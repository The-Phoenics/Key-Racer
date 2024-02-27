import { MAX_LINES_IN_ONE_PARA, MAX_WORDS_IN_ONE_LINE } from "./nodeGenerator.mjs"
import { onCorrect, onIncorrect, randomParagraph } from "./utils.mjs"
import { changeViewText } from "./viewContent.mjs"

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

    // words that has been typed so far
    wordsTypedCount: 0,
    // letter/characters that has been typed so far
    lettersTypedCount: 0,

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
    },

    updateCurrentWordElement: function () {
        this.wordsInCurrentLine = this.currentLineElement.childNodes.length
        this.currentWordElement = this.currentLineElement.childNodes[INFO.currentWord];
        this.lettersInCurrentWord = this.currentWordElement.childNodes.length
    },

    updateCurrentLetterElement: function () {
        this.currentLineElement = this.linesNodeList[INFO.currentLine]
    },

    updateCurrentLetter: function() {
        INFO.currentLetter++
        INFO.lettersTypedCount++
    },

getWordsTyped: function() {
    return this.wordsTypedCount;
},

getLettersTyped: function() {
    return this.lettersTypedCount;
}
}

export function initLinesDataG() {
    INFO.linesNodeList = document.querySelectorAll('.line');
    INFO.numOfLines = INFO.linesNodeList.length
}

// Update/Initialize the INFO object data
export function initInfoDataG() {
    INFO.currentLineElement = INFO.linesNodeList[INFO.currentLine]
    INFO.currentWordElement = INFO.currentLineElement.childNodes[INFO.currentWord];
    INFO.currentLetterElement = INFO.currentWordElement.childNodes[INFO.currentLetter]

    INFO.wordsInCurrentLine = INFO.currentLineElement.childNodes.length
    INFO.lettersInCurrentWord = INFO.currentWordElement.childNodes.length
}

// Function for updateing the content text on the basis of validation
export function updateViewContentG(keyPressedCharacter) {
    if (!INFO.hasFinished()) {
        updateInfo()
        validate(keyPressedCharacter)
    } else {
        resetInfo()
        let contentTextVal = randomParagraph(MAX_WORDS_IN_ONE_LINE, MAX_LINES_IN_ONE_PARA)
        // Changing the content once user finishes
        changeViewText(contentTextVal)
        // update info object when view's text changes
        initLinesDataG()
        initInfoDataG()
    }
}

function resetInfo() {
    INFO.currentLine = 0
    INFO.currentWord = 0
    INFO.currentLetter = 0
    initLinesDataG()
}

function updateInfo() {
    // go to next word
    if (INFO.lettersInCurrentWord == INFO.currentLetter) {
        INFO.currentLetter = 0
        INFO.currentWord++
        // update the words typed count
        INFO.wordsTypedCount++
    }
    // go to next line
    if (INFO.wordsInCurrentLine == INFO.currentWord) {
        INFO.currentWord = 0
        INFO.currentLine++
        INFO.wordsTypedCount++
        // update the letters typed count
        INFO.lettersTypedCount++
    }
    if (INFO.linesNodeList.length == 0) {
        console.log(`There are no lines in content!`)
    } else {
        initLinesDataG()
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