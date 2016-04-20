import {Simulation} from "./simulation";
import {Angle} from "./angle";

document.addEventListener("DOMContentLoaded", function(event) {
    var drawCanvas = document.getElementById("draw");
    var sim = new Simulation(drawCanvas);
    window['toggleSimulation'] = sim.toggleSimulation.bind(sim);
    window['resetSimulation'] = sim.viewStyle.bind(sim);
    window['viewStyle'] = sim.viewStyle.bind(sim);

    // DEBUG //
    window['automata'] = sim.automata;
    window['Angle'] = Angle;
});
