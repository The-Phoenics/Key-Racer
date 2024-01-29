const keys = document.querySelectorAll(".key");

keys.forEach((keyElement) => {
    keyElement.addEventListener('click', () => keyClickEffect(this));
});

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
    'Win': 'win',
    'Alt': 'alt-left',
    ' ': 'space',
    'AltGraph': 'alt',
    'ContextMenu': 'win',
};

function onKeyPress(className) {
    let keyClassName = '.' + className;
    const element = document.querySelector(keyClassName);
    keyClickEffect(element);
}

function keyClickEffect(element) {
    element.classList.add("clicked");
    setTimeout(() => element.classList.remove("clicked"), 100);
}

window.addEventListener('keydown', (event) => {
    let keyStr = event.key
    if (keyStr >= 'a' && keyStr <= 'z') {
        onKeyPress(keyStr)
    } else { 
        if (classNames[event.key] != undefined)
            onKeyPress(classNames[event.key])
    }
});


