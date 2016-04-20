/*
app.ts
*/

var FRAME_DELAY = 100;

import {Automata} from "./automata";

import {Angle} from "./angle";
window['Angle'] = Angle;

var updateInterval;
var automata;
document.addEventListener('DOMContentLoaded', function() {
    automata = new Automata("prototype");
    window['automata'] = automata;

    startSimulation();

    document.getElementById("draw").addEventListener("mousemove", function(event) {
        automata.showInfo(event.offsetX, event.offsetY);
    })

})

var isSimulationRunning = false;
window['toggleSimulation'] = function() {
    if (isSimulationRunning)
        stopSimulation();
    else
        startSimulation();
}

function startSimulation() {
    updateInterval = window.setInterval(function() {
        automata.update();
        automata.draw();
    }, FRAME_DELAY);
    isSimulationRunning = true;
}

function stopSimulation() {
    window.clearInterval(updateInterval);
    isSimulationRunning = false;
}

window['viewStyle'] = function(style) {
    console.log('viewstyle', style);
    automata.viewStyle = style;
    automata.draw();
}
