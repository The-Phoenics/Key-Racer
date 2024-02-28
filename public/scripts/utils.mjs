import { INFO } from "./validate.mjs"
import { RANDOM_WORDS_ARRAY } from "./words.mjs"

export function appendNextSiblingChild(nodeToAppend, existingNode) {
    if (existingNode.nextSibling) {
        existingNode.parentNode.insertBefore(nodeToAppend, existingNode.nextSibling);
    } else {
        existingNode.parentNode.appendChild(nodeToAppend);
    }
}

export function isAlphabet(character) {
    return character >= 'a' && character <= 'z'
}

export function onCorrect(letterElement) {
    if (letterElement) {
        letterElement.classList.add('correct')
        INFO.updateCurrentLetter()
    }
    else
        console.log('Invalid letter element!')
}

export function onIncorrect(letterElement) {
    if (letterElement) {
        letterElement.classList.add('incorrect')
        INFO.updateCurrentLetter()
    }
    else
        console.log('Invalid letter element!')
}

export function makeLetterPending(letterElement) {
    if (letterElement) {
        letterElement.classList.add('pending')
        letterElement.classList.remove('correct')
        letterElement.classList.remove('incorrect')
    } else
        console.log('Invalid letter element!')
}

export function randomParagraph(maxWordsInOneLine, maxNumOfLines) {
    const shuffledArray = shuffleArray(RANDOM_WORDS_ARRAY);
    const totalWords = shuffledArray.length;

    const wordsPerLine = Math.min(maxWordsInOneLine, totalWords);
    const lines = Math.min(maxNumOfLines, Math.ceil(totalWords / wordsPerLine));

    let result = '';
    for (let i = 0; i < lines; i++) {
        const lineWords = shuffledArray.slice(i * wordsPerLine, (i + 1) * wordsPerLine);
        // Append the words to the result string
        result += lineWords.join(' ') + '\n';
    }
    return result;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const KEY_CLASSNAMES_MAPPING = {
    '`': 'tilde',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '0': 'zero',
    '-': 'hyphen',
    '=': 'plus',
    'Backspace': 'backspace',
    'Tab': 'tab',
    '[': 'left-curly-brace',
    ']': 'right-curly-brace',
    '\\': 'pipe',
    'CapsLock': 'caps-lock',
    ';': 'semicolon',
    "'": 'double-quotes',
    'Enter': 'enter',
    'Shift': 'shift-left',
    ',': 'left-angle-bracket',
    '.': 'right-angle-bracket',
    '/': 'question-mark',
    'Control': 'ctrl-left',
    'Meta': 'win-right',
    'Alt': 'alt-left',
    ' ': 'space',

    // right side keys
    'Alt-R': 'alt-right',
    'Control-R': 'ctrl-right',
    'Shift-R': 'shift-right',
    'Meta-R': 'win-right'
};