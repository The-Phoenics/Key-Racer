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