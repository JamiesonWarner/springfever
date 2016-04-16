console.log('HELLO WORLD!');

import {Automata} from "./automata";

var updateInterval;
var automata;
document.addEventListener('DOMContentLoaded', function() {
    automata = new Automata("prototype");
    window['automata'] = automata;
    updateInterval = window.setInterval(function() {
        automata.update();
        automata.draw();
    }, 1000);
    // window.setInterval(function() {
    // }, 100);
})

window['stopSimulation'] = function() {
    window.clearInterval(updateInterval);
}

window['viewStyle'] = function(style) {
    console.log('viewstyle', style);
    automata.viewStyle = style;
    automata.draw();
}