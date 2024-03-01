import { makeLetterPending, isAlphabet, KEY_CLASSNAMES_MAPPING, onCorrectSpace } from "./utils.mjs";
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
    event.preventDefault()

    if (pressedKey == 'Backspace') {
        updateOnBackSpace()
    }
    else if (pressedKey == ' ') {
        updateOnSpacePress(pressedKey);
    }
    else {
        // update the view's text with validation
        const pressedKeyValue = evaluateKeyPressedValue(pressedKey)
        if (pressedKeyValue)
            updateViewContentG(pressedKeyValue.trim());
    }

    // highlighting the keyboard keys
    updateKeyboardOnKeyPressOnKeyDown(pressedKey, pressedKeyLocation);
});

function onKeyPress(className) {
    let keyClassSelector = '.' + className;
    const element = document.querySelector(keyClassSelector);
    keyClickEffect(element);
}

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
            INFO.updateCurrentLetterElement()
            makeLetterPending(INFO.currentWordElement.childNodes[INFO.currentLetter])

            // change styling of the space element to pending
            if (INFO.currentWordElement.classList.contains('space-element')) {
                INFO.currentWordElement.childNodes[0].classList.remove('incorrect-space')
                makeLetterPending(INFO.currentWordElement.childNodes[INFO.currentLetter])
            }
        }
        else {
            INFO.currentLetter--
            makeLetterPending(INFO.currentWordElement.childNodes[INFO.currentLetter])
            // reduce the letters typed count
            INFO.updateCurrentLetterElement()
            INFO.lettersTypedCount--
        }
    }
}

function updateOnSpacePress() {
    if (INFO.isAtSpaceElement()) {
        onCorrectSpace(INFO.currentWordElement.childNodes[0])
    }
}

// event listeners for mouse clicks on all keys
document.querySelectorAll(".key").forEach((keyElement) => {
    keyElement.addEventListener('click', function () {
        keyClickEffect(this)
    });
})