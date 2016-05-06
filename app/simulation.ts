/*
app.ts
*/

import {Automata} from "./automata";
import {DNA, DNASerializer} from "./dna";
// import {MY_PLANT} from "./myplant";

// interface for view layer
export interface IViewSimulation {
    // constructor(drawCanvas: Element): void;
    reset(): void; // set state to initial

    pause(): void; // pause execution
    run(): void; //

    // setDrawEnabled()
    // setDrawDisabled()
}

export class Simulation implements IViewSimulation {
    FRAME_DELAY: number = 400;

    updateInterval: number;
    automata: Automata;
    drawEnabled: boolean;
    drawCanvas: Element;

    // a reference to the dna used to make the automata
    dna: DNA;

    // flags for showing status
    isSimulationRunning: boolean;
    midUpdate: boolean;

    tick = 0;

    constructor(drawCanvas: Element) {
        this.drawCanvas = drawCanvas;
        this.drawEnabled = true;

        // this.dna = DNASerializer.deserialize(MY_PLANT); // to load DNA from a file
        this.dna = new DNA();
        this.reset(this.dna);
    }


    reset(dna?: DNA) {
        this.showStatusString('Resetting...');
        this.tick = 0;
        if (!dna) {
            dna = new DNA();
            dna.mutate(1);
        }
        var viewTemp = this.automata && this.automata.drawStyle;
        this.automata = new Automata('prototype', this.drawCanvas);
        this.automata.plantSeed(dna);
        if (viewTemp)
            this.automata.drawStyle = viewTemp;
    }


    run() {
        if (this.drawEnabled) {
            this.automata.draw();
        }

        this.isSimulationRunning = true;
        this.updateStatus();

        var self = this;
        this.updateInterval = window.setInterval(function() {
            try {
                // self.midUpdate = true;
                // self.updateStatus();
                self.automata.update();
                // self.midUpdate = false;
                self.tick++;
                self.updateStatus();

            } catch(e) {
                console.warn("Automata error! Stopping simulation...");
                self.pause();
                throw e;
            }

            if (self.drawEnabled) {
                self.automata.draw();
            }
        }, this.FRAME_DELAY);
    }

    runForNTicks(N) {
        // run sim for N ticks
        for (var n = 0; n < N; ++n) {
            this.automata.update();
        }
        this.automata.draw();
    }


    pause() {
        window.clearInterval(this.updateInterval);
        this.isSimulationRunning = false;
        this.showStatusString('Simulation stopped.');
    }

    toggleSimulation() {
        if (this.isSimulationRunning)
            this.pause();
        else
            this.run();
    }

    toggleDraw() {
        this.drawEnabled = !this.drawEnabled;
        this.updateStatus();
    }

    drawStyle(style) {
        console.log('drawStyle', style);
        this.automata.drawStyle = style;
        this.automata.draw();
    }

    updateStatus() {
        var status;
        if (this.isSimulationRunning)
            status = 'Simulation running. ';
        else
            status = 'Simulation stopped. ';
        if (!this.drawEnabled)
            status += '(Draw disabled.) ';
        status += "Tick " + this.tick;
        if (this.midUpdate) status += "*";
        this.showStatusString(status);
    }

    showStatusString(status) {
        document.getElementById("status").innerHTML = status;
    }
}
