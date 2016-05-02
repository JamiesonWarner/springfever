/*
app.ts
*/

import {Automata} from "./automata";
import {DNA} from "./dna";

export class Simulation {
    FRAME_DELAY: number = 1000;

    updateInterval: number;
    automata: Automata;
    isSimulationRunning: boolean;
    drawEnabled: boolean;
    drawCanvas: Element;

    constructor(drawCanvas: Element) {
        this.drawCanvas = drawCanvas;
        this.drawEnabled = true;
        this.automata = new Automata('prototype', drawCanvas);
        this.automata.plantSeed(new DNA());
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

        this.automata.draw();
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

    setupSimulation(dna: DNA) {
        if (!dna) {
            dna = new DNA();
        }
        this.showStatusString('Resetting...');
        let view = this.automata.viewStyle;
        this.stopSimulation();
        this.automata = null;
        this.automata = new Automata('prototype', this.drawCanvas);
        this.automata.plantSeed(dna);
        this.automata.viewStyle = view;
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
