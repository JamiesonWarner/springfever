console.log('HELLO WORLD!');

import {Automata} from "./automata";


document.addEventListener('DOMContentLoaded', function() {
    var automata = new Automata("prototype");
    window['automata'] = automata;
    window.setInterval(function() {
        automata.update();
        automata.draw();
    }, 1000);
    // window.setInterval(function() {
    // }, 100);
})

