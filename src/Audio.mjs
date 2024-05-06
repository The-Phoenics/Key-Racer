const AUDIO = {
    CORRECT_KEYPRESS_AUDIO: null,
    INCORRECT_KEYPRESS_AUDIO: null,

    init: function() {
        AUDIO.CORRECT_KEYPRESS_AUDIO = new Audio('res/corr-key-press.mp3');
        AUDIO.CORRECT_KEYPRESS_AUDIO.load();
        AUDIO.CORRECT_KEYPRESS_AUDIO.volume = 0.2
        AUDIO.INCORRECT_KEYPRESS_AUDIO = new Audio('res/inc-key-press.mp3');
        AUDIO.CORRECT_KEYPRESS_AUDIO.load();
        AUDIO.INCORRECT_KEYPRESS_AUDIO.volume = 0.1
    },

    playCorrectKeyPressAudio: function() {
        AUDIO.CORRECT_KEYPRESS_AUDIO.cloneNode(true).play();
    },

    playIncorrectKeyPressAudio: function() {
        AUDIO.INCORRECT_KEYPRESS_AUDIO.cloneNode(true).play();
    },
}

export default AUDIO;