import {AnagrindClient} from './client.js'
import {CrosswordDisplay} from './display.js'

const parser = require('./parser.js');
const client = new AnagrindClient(window.location.host, window.location.pathname);
const display = new CrosswordDisplay(document.getElementsByClassName('crossword-display')[0]);

const sourceEl = document.getElementById('crossword-source');
const renderButton = document.getElementById('render-button');

renderButton.onclick = function() {
    const crossword = parser.parse(sourceEl.value);
    display.setCrossword(crossword);
}

document.getElementById('send-message-button').onclick = function() {
    client.sendUpdate({action: 'test'});
}

document.getElementById('crossword-source').value = parser.sampleCrossword();

renderButton.click();
