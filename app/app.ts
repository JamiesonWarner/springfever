/*
app.js
The view provider layer!
This calls:
(simulationStart) when


*/

import {Simulation} from "./simulation";
import {Evolution} from "./evolution";
import {Angle} from "./angle";
import {Utils} from "./utils";

document.addEventListener("DOMContentLoaded", function(event) {
    var drawCanvas = document.getElementById("draw");

    var sim = new Simulation(drawCanvas);
    sim.run();

    // var sim = new Evolution(drawCanvas);
    // var best = sim.doEvolution();

    // var

    window['toggleSimulation'] = sim.toggleSimulation.bind(sim);
    window['resetSimulation'] = function() {
        console.log("=== Resetting simulation ===");
        sim.reset();
    }
    window['toggleDraw'] = sim.toggleDraw.bind(sim);
    window['drawStyle'] = sim.drawStyle.bind(sim);

    // sim.runForNTicks(100);

    // DEBUG //
    window['automata'] = sim.automata;
    window['simulation'] = sim;
    window['Angle'] = Angle;
    window['Utils'] = Utils;
});
