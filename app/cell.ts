import {Fluids} from "./fluids";

/*
Cell is a fleighweight object for the Grid. Systems.
Plus they also have context for fitting into the Grid.
*/

export class Cell {

    // grid: Array<Array<Object>>;

    fluids: Fluids;
    row;
    col;
    type; // coresponds to types in DNA
    dna;
    angle;
    signals;

    constructor(dna,type,fluids,row,col) {
        this.row = row;
        this.col = col;
        this.fluids = fluids;

        if (typeof type === 'number') {
            this.type = dna.cellTypes[type];
        }
        else {
            this.type = type;
        }
        this.dna = dna;

        for (var i = 0; i < Fluids.N_SIGNALS; ++i) {
            this.fluids[Fluids.SIGNALS_START + i] = this.type.signalInit[i];
        }
    }

    updateSignals() {
        // multiply by matrix
        // var newSignals = new Array(Fluids.N_SIGNALS);
        // for (var i = 0; i < newSignals.length; ++i) {
        //     newSignals[i] = 0;
        // }

        // var mtx = this.type.signalMatrix;
        // for (var i = 0; i < newSignals.length; i++) {
        //     for (var j = 0; j < Fluids.N_SIGNALS; j++) { // first SIGNALS columns of matrix...
        //         newSignals[i] += this.fluids.vector[j+Fluids.SIGNALS_START] * mtx[i][j];
        //     }
        //     for (j = 0; j < this.fluids.vector.length; ++j) {
        //         newSignals[i] += this.fluids.vector[j] * mtx[i][j+this.signals.vector.length];
        //     }
        // }

        // var vec = this.dna.cellTypes[this.type].signalB;
        // // console.log('signals', newSignals, 'mtx', mtx, 'vec', vec);
        // for (var i = 0; i < vec.length; i++) {
        //     newSignals[i] += vec[i];
        // }

        // for (var i = 0; i < newSignals.length; i++) {
        //     this.signals.vector[i] = Math.max(0, Math.min(1, newSignals[i]));
        // }
    }

    update() {

    }

    /*
    returns -
        {
            type: 'grow'
            parameters: {
                'up', 'right', 'down', 'left'
            }
        }

    */
    getAction() {
        return this.dna.chooseAction(this.signals, this.type);
    }
}
