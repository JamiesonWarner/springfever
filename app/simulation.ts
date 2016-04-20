/*
app.ts
*/

import {Automata} from "./automata";

export class Simulation {
    FRAME_DELAY: number = 20;

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

    runForNTicks(N) {
        // run sim for N ticks
        for (var n = 0; n < N; ++n) {
            this.automata.update();
        }
        this.automata.draw();
    }

    startSimulation() {
        this.isSimulationRunning = true;
        this.updateStatus();

        var self = this;
        this.updateInterval = window.setInterval(function() {
            try {
                self.automata.update();
            } catch(e) {
                console.warn("Automata error! Stopping simulation...");
                self.stopSimulation();
                throw e;
            }

            if (self.drawEnabled) {
                self.automata.draw();
            }
        }, this.FRAME_DELAY);
    }

    stopSimulation() {
        this.showStatusString('Simulation stopped.');
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
        this.showStatusString('Resetting...');
        this.stopSimulation();
        this.automata = null;
        this.automata = new Automata('prototype', this.drawCanvas);
        this.startSimulation();
    }

    toggleDraw() {
        this.drawEnabled = !this.drawEnabled;
        this.updateStatus();
    }

    viewStyle(style) {
        console.log('viewstyle', style);
        this.automata.viewStyle = style;
        this.automata.draw();
    }

    updateStatus() {
        let status;
        if (this.isSimulationRunning)
            status = 'Simulation running. ';
        else
            status = 'Simulation stopped. ';
        if (!this.drawEnabled)
            status += '(Draw disabled.) ';
        this.showStatusString(status);
    }

    showStatusString(status) {
        document.getElementById("status").innerHTML = status;
    }
}
