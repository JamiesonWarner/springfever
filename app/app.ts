console.log('HELLO WORLD!');

import {Automata} from "./automata";


var automata = new Automata();
window.setInterval(function() {
    automata.update();
}, 1000);
window.setInterval(function() {
    automata.draw();
}, 100);

