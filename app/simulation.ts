/*
app.ts
*/

import {Automata} from "./automata";
import {DNA, DNASerializer} from "./dna";
import {Cell} from "./cell";
import {MY_PLANT} from "./myplant";

// interface for view layer
export interface IViewSimulation {
    // constructor(drawCanvas: Element): void;
    reset(): void; // set state to initial
    pause(): void; // pause execution
    run(): void; //
    isSimulationRunning


    // setDrawEnabled()
    // setDrawDisabled()
}

export class Simulation implements IViewSimulation {
    FRAME_DELAY: number = 80;

    automata: Automata;
    drawEnabled: boolean;
    drawCanvas: Element;

    // a reference to the dna used to make the automata
    dna: DNA;

    // flags for showing status
    isSimulationRunning: boolean;
    midUpdate: boolean;

    tick = 0;
    updateInterval: number;

    fitness: Array<number>;

    constructor(drawCanvas: Element) {
        this.drawCanvas = drawCanvas;
        this.drawEnabled = true;


        // this.dna = DNASerializer.deserialize(MY_PLANT); // to load DNA from a file
        // this.dna = new DNA();
        this.reset();
    }


    reset(dna?: DNA) {
        this.showStatusString('Resetting...');
        this.tick = 0;
        if (!dna) {
            dna = new DNA();
            dna.mutate(10);
        }
        var viewTemp = this.automata && this.automata.drawStyle;
        this.automata = new Automata('prototype', this.drawCanvas);
        this.automata.plantSeed(dna);
        if (viewTemp)
            this.automata.drawStyle = viewTemp;

        window['fitness'] = this.fitness = [];

        // if (this.isSimulationRunning) {
        //     this.updatePlantForever();
        // }
    }


    run() {
        if (this.isSimulationRunning) {
            throw new TypeError("Simulation is already running");
        }
        if (this.drawEnabled) {
            this.automata.draw();
        }

        this.isSimulationRunning = true;
        this.updateStatus();
        this.updatePlantForever();
    }

    // weird self-calling function
    updatePlantForever() {
        if (!this.isSimulationRunning) {
            return;
        }

        try {
            this.fitness[this.tick] = this.evalFitness(this.automata.plant);
            this.automata.update();
        } catch(e) {
            console.warn("Automata error! Stopping simulation...");
            this.pause();
            throw e;
        }

        if (this.drawEnabled) {
            try {
                this.automata.draw();
            } catch(e) {
                console.warn("Draw error! Stopping simulation...");
                this.pause();
                throw e;
            }
        }

        this.tick ++;
        this.updateStatus();
        window.setTimeout(this.updatePlantForever.bind(this), this.FRAME_DELAY);
    }

    evalFitness(plant: Array<Cell>): number {
        var tfluids = 0;
        for (var i = 0; i < plant.length; ++i) {
            var cell: Cell = plant[i];
            tfluids += cell.sumFluids();
        }
        return tfluids;
    }

    runForNTicks(N) {
        // run sim for N ticks
        for (var n = 0; n < N; ++n) {
            this.automata.update();
        }
        this.automata.draw();
    }


    pause() {
        if (!this.isSimulationRunning) {
            throw new TypeError("Simulation is already paused");
        }
        window.clearTimeout(this.updateInterval);
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
