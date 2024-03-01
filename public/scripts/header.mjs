/*
* Timer
* WPM speed
*/

import { INFO } from "./validate.mjs";

// Update word per minute speed
const wpmElement = document.querySelector('.speed-info')
const timerElement = document.querySelector('.time-txt')
let timerInterval = null;

export function startTimer() {
    // Update timer
    timerInterval = setInterval(() => {
        timerElement.innerText = parseInt(timerElement.innerText) + 1
    }, 1000)
}

export function stopTimer() {
    clearInterval(timerInterval);
}

function updateWPM() {
    wpmElement.innerText = calculateWPM()
}

let wpmInterval = setInterval(() => updateWPM(), 2000);

function calculateWPM() {
    const elapsedTimeInSeconds = parseInt(timerElement.innerText)
    const wordsTyped = INFO.getWordsTyped();
    // const lettersTyped = INFO.getLettersTyped();
    if (elapsedTimeInSeconds != 0) {
        const wpmSpeed = Math.round((wordsTyped) / (elapsedTimeInSeconds / 60));
        if (wpmSpeed > 0) {
            return wpmSpeed;
        }
    }
    return 0;
}
