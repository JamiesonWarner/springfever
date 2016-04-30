import {Simulation} from "./simulation";
import {Evolution} from "./evolution";
import {Angle} from "./angle";

document.addEventListener("DOMContentLoaded", function(event) {
    var drawCanvas = document.getElementById("draw");
    var sim = new Simulation(drawCanvas);
    sim.startSimulation();
    // sim.doEvolution();
    window['toggleSimulation'] = sim.toggleSimulation.bind(sim);
    window['resetSimulation'] = function() {
        sim.resetSimulation(); //.bind(sim);
        sim.startSimulation();
    }
    window['toggleDraw'] = sim.toggleDraw.bind(sim);
    window['viewStyle'] = sim.viewStyle.bind(sim);

    // sim.runForNTicks(100);

    // DEBUG //
    window['automata'] = sim.automata;
    window['simulation'] = sim;
    window['Angle'] = Angle;
});
