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
import {DNASerializer} from "./dna";
import {IViewSimulation} from "./simulation";

document.addEventListener("DOMContentLoaded", function(event) {
    var drawCanvas = document.getElementById("draw");

    var sim: IViewSimulation = new Simulation(drawCanvas);
    // var sim = new Evolution(drawCanvas);

    sim.run();

    var simOn = sim.isSimulationRunning;

    window['toggleSimulation'] = function() {
        if (simOn) {
            sim.pause();
        } else {
            sim.run();
        }
        simOn = !simOn;
    }
    window['resetSimulation'] = function() {
        console.log("=== Resetting simulation ===");
        sim.reset();
    }
    window['toggleDraw'] = sim.toggleDraw.bind(sim);
    window['drawStyle'] = sim.drawStyle.bind(sim);

    // sim.runForNTicks(100);

    // DEBUG //
    // window['automata'] = sim.automata;
    window['simulation'] = sim;
    window['Angle'] = Angle;
    window['Utils'] = Utils;
    window['DNASerializer'] = DNASerializer;
});
