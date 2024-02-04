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
    keyElement.addEventListener('click', function() { 
        keyClickEffect(this)
    });
});


