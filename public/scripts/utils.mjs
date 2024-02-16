import { INFO } from "./validate.mjs"

export function isAlphabet(character) {
    return character >= 'a' && character <= 'z'
}

export function onCorrect(letterElement) {
    if (letterElement) {
        letterElement.classList.add('correct')
        INFO.currentLetter++
    }
    else
        console.log('Invalid letter element!')
}

export function onIncorrect(letterElement) {
    if (letterElement) {
        letterElement.classList.add('incorrect')
        INFO.currentLetter++
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