/*
app.ts
*/

import {Automata} from "./automata";

export class Simulation {
    FRAME_DELAY: number = 100;

    updateInterval: number;
    automata: Automata;
    isSimulationRunning: boolean;
    drawEnabled: boolean;
    drawCanvas: Element;

    constructor(drawCanvas: Element) {
        this.drawCanvas = drawCanvas;
        this.drawEnabled = true;
        this.automata = new Automata('prototype', drawCanvas);
        this.startSimulation();
    }

    startSimulation() {
        var self = this;
        this.updateInterval = window.setInterval(function() {
            try {
                self.automata.update();
            } catch(e) {
                console.error("Automata error! Stopping simulation...");
                self.stopSimulation();
                throw e;
            }

            if (self.drawEnabled) {
                self.automata.draw();
            }
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
        this.stopSimulation();
        this.automata = null;
        this.automata = new Automata('prototype', this.drawCanvas);
        this.startSimulation();
    }

    toggleDraw() {
        this.drawEnabled = !this.drawEnabled;
    }
    viewStyle(style) {
        console.log('viewstyle', style);
        this.automata.viewStyle = style;
        this.automata.draw();
    }
}
