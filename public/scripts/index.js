const keys = document.querySelectorAll(".key");

const classNames = {
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
    'Win': 'win-right',
    'Alt': 'alt-left',
    ' ': 'space',

    // right side keys
    'Alt-R': 'alt-right',
    'Control-R': 'ctrl-right',
    'Shift-R': 'shift-right',
    'Win-R': 'win-right'
};

const spaceString = '\u00A0'
const newlineString = '\u000A'

function onKeyPress(className) {
    let keyClassSelector = '.' + className;
    const element = document.querySelector(keyClassSelector);
    keyClickEffect(element);
}

function keyClickEffect(element) {
    element.classList.add("clicked");
    setTimeout(() => element.classList.remove("clicked"), 100);
}

// event listeners for keyboard clicks for all keys
window.addEventListener('keydown', (event) => {
    let keyStr = event.key
    if (keyStr >= 'a' && keyStr <= 'z') {
        onKeyPress(keyStr)
    } else {
        if (event.location == 2) // for right side keys
            keyStr = keyStr + '-R'
        if (classNames[keyStr] != undefined) {
            console.log(keyStr)
            onKeyPress(classNames[keyStr])
        }
    }
});

// event listeners for mouse clicks on all keys
keys.forEach((keyElement) => {
    keyElement.addEventListener('click', function () {
        keyClickEffect(this)
    });
});


// ---
const contentTxtElement = document.querySelector('.content');
const content = contentTxtElement.innerText;

const contentVal = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sed ornare ipsum, a eleifend nisi.
Donec ultrices mi elit, fermentum ultrices mi dignissim eget. Phasellus dapibus felis non nisl luctus laoreet.
Nunc urna massa, ultricies nec aliquam at, eleifend ornare ante. In vitae leo ultricies, blandit mauris vitae, consectetur nulla.
Pellentesque convallis iaculis tristique. Sed in dapibus purus, sed cursus enim. Sed vitae tellus lorem. Duis a venenatis erat.
Phasellus sed varius lectus. Cras vulputate eros tellus, eu molestie justo egestas id. Nam ut lacus vel felis scelerisque accumsan in ornare quam.
Suspendisse id venenatis augue. In rhoncus nibh libero, at egestas diam blandit vitae.`;

const maxWordsInOneLine = 17;
const maxLinesInOnePara = 6;

function generateNodesForContent(contentValue) {
    // lines
    const linesArray = contentValue.split('\n');
    linesArray.forEach((line) => {
        const lineElement = document.createElement('div');
        lineElement.classList.add('line');

        // words
        const wordsArray = line.split(' ');
        let loopIterationsForWords = wordsArray.length < maxWordsInOneLine ? wordsArray.length : maxWordsInOneLine;
        for (let i = 0; i < loopIterationsForWords; i++) {
            const wordElement = document.createElement('span');
            wordElement.classList.add('word');
            lineElement.appendChild(wordElement); // add words child element

            // letters
            const letterArray = wordsArray[i].split('');
            letterArray.forEach((letter, letterIndex) => {
                // letter
                const letterElement = document.createElement('span');
                letterElement.classList.add('letter');
                if (letterIndex === letterArray.length - 1) {
                    letter += spaceString
                }
                letterElement.innerText = letter;
                wordElement.appendChild(letterElement);
            });
        }

        // wordsArray.every((word, wordIndex) => { });
        const newLineElement = lineElement.lastElementChild.lastElementChild;
        newlineString.innerText = newLineElement.innerText + newlineString
        contentTxtElement.appendChild(lineElement);
    });
    console.log(contentTxtElement);
}
generateNodesForContent(contentVal);
