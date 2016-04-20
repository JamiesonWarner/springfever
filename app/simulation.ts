/*
app.ts
*/

import {Automata} from "./automata";

export class Simulation {
    FRAME_DELAY: number = 100;

    updateInterval: number;
    automata: Automata;
    isSimulationRunning: boolean;
    drawCanvas: Element;

    constructor(drawCanvas: Element) {
        this.automata = new Automata('prototype', drawCanvas);
        this.startSimulation();
    }

    startSimulation() {
        var self = this;
        this.updateInterval = window.setInterval(function() {
            self.automata.update();
            self.automata.draw();
        }, this.FRAME_DELAY);
        this.isSimulationRunning = true;
    }

    stopSimulation() {
        window.clearInterval(this.updateInterval);
        this.isSimulationRunning = false;
    }

    toggleSimulation() {
        if (this.isSimulationRunning)
            this.stopSimulation();
        else
            this.startSimulation();
    }

    resetSimulation() {

    }

    viewStyle(style) {
        console.log('viewstyle', style);
        this.automata.viewStyle = style;
        this.automata.draw();
    }
}
