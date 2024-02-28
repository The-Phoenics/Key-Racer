import { makeLetterPending, isAlphabet, KEY_CLASSNAMES_MAPPING } from "./utils.mjs";
import { INFO, updateViewContentG } from "./validate.mjs";
import { startTimer } from "./header.mjs";
import { randomParagraph, removeAllChildNodes } from "./utils.mjs";
import { MAX_LINES_IN_ONE_PARA, MAX_WORDS_IN_ONE_LINE, generateNodesForContent } from "./nodeGenerator.mjs";
import { initInfoDataG, initLinesDataG } from "./validate.mjs";

let has_started = false;
function start_timer_on_key_press() {
    if (!has_started) {
        startTimer();
    }
    has_started = true
}

/*
* Initalization
*/
window.onload = () => {
    // random paragraph for content
    let contentValue = randomParagraph(MAX_WORDS_IN_ONE_LINE, MAX_LINES_IN_ONE_PARA)
    removeAllChildNodes(document.querySelector('.content'))
    // generate nodes for all the text content
    generateNodesForContent(document.querySelector('.content'), contentValue)
    // initalize INFO object's data
    initLinesDataG()
    initInfoDataG()
}

/*
* Keyboard event listeners
*/
window.addEventListener('keyup', (event) => {
    const pressedKey = event.key
    const pressedKeyLocation = event.location

    // highlighting the keyboard keys
    updateKeyboardOnKeyPressOnKeyUp(pressedKey, pressedKeyLocation);
});

window.addEventListener('keydown', (event) => {
    start_timer_on_key_press()
    const pressedKeyLocation = event.location
    const pressedKey = event.key

    if (pressedKey == 'p') {
        console.log(`cLetter: ${INFO.currentLetter}   cWord: ${INFO.currentWord}   cline: ${INFO.currentLine}`)
        console.log('cLetterE: ', INFO.currentLetterElement)
        console.log('cWordE:   ', INFO.currentWordElement)
    }
    else {
        if (pressedKey == 'Backspace') {
            updateOnBackSpace()
        }

        if (pressedKey == ' ') {
            updateOnSpacePress(pressedKey);
        }

        // highlighting the keyboard keys
        updateKeyboardOnKeyPressOnKeyDown(pressedKey, pressedKeyLocation);

        // update the view's text with validation
        const pressedKeyValue = evaluateKeyPressedValue(pressedKey)
        if (pressedKeyValue)
            updateViewContentG(pressedKeyValue);
    }
});

function onKeyPress(className) {
    let keyClassSelector = '.' + className;
    const element = document.querySelector(keyClassSelector);
    keyClickEffect(element);
}

setInterval(() => {
    if (INFO.isAtLastLetterOfWord()) {
        console.log('at space')
    }
}, 100);

function keyClickEffect(element) {
    element.classList.add("clicked");
    setTimeout(() => element.classList.remove("clicked"), 50);
}

// evaluate the valid key press and string value of the pressed key
function evaluateKeyPressedValue(pressedKeyStr) {
    if (pressedKeyStr.length === 1) {
        return pressedKeyStr;
    } else {
        return null;
    }
}

function updateKeyboardOnKeyPressOnKeyUp(pressedKeyStr, keyUpEventLocation) {
    if (isAlphabet(pressedKeyStr)) {
        onKeyPress(pressedKeyStr)
    } else {
        if (keyUpEventLocation == 2)
            pressedKeyStr = pressedKeyStr + '-R'
        if (KEY_CLASSNAMES_MAPPING[pressedKeyStr] != undefined) {
            onKeyPress(KEY_CLASSNAMES_MAPPING[pressedKeyStr])
        }
    }
}

function updateKeyboardOnKeyPressOnKeyDown(pressedKeyStr, keyUpEventLocation) {
    if (isAlphabet(pressedKeyStr)) {
        document.querySelector('.' + pressedKeyStr).classList.add("clicked");
    } else {
        if (keyUpEventLocation == 2)
            pressedKeyStr = pressedKeyStr + '-R'
        if (KEY_CLASSNAMES_MAPPING[pressedKeyStr] != undefined) {
            document.querySelector('.' + KEY_CLASSNAMES_MAPPING[pressedKeyStr]).classList.add("clicked");
        }
    }
}

/*
* Backspace key press update
*/
function updateOnBackSpace() {
    if (!INFO.isAtFirstLetterFirstLine()) {
        if (INFO.isAtFirstLetterOfCurrentLine()) {
            //...
        }
        else if (INFO.isAtFirstLetterOfWord()) {
            INFO.currentWord--
            INFO.updateCurrentWordElement()
            INFO.currentLetter = INFO.lettersInCurrentWord - 1
            makeLetterPending(INFO.currentWordElement.childNodes[INFO.currentLetter])
            // reduce the words typed count
            INFO.wordsTypedCount--
        }
        else {
            INFO.currentLetter--
            makeLetterPending(INFO.currentWordElement.childNodes[INFO.currentLetter])
            // reduce the letters typed count
            INFO.lettersTypedCount--
        }
    }
}

function updateOnSpacePress() {
    console.log('space pressed');
    if (INFO.isAtSpaceElement()) {
        console.log('at space')
    }
}

// event listeners for mouse clicks on all keys
document.querySelectorAll(".key").forEach((keyElement) => {
    keyElement.addEventListener('click', function () {
        keyClickEffect(this)
    });
})