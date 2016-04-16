import {Signals} from "./signals";

export class Cell {
    fluids;
    x;
    y;
    type;
    dna;
    angle;
    signals;

    constructor(x,y,fluids,type, dna) {
        this.x = x;
        this.y = y;
        this.fluids = fluids;
        this.type = type;
        this.dna = dna;
        this.signals = new Signals(dna.cellTypes[type].signalInit);
    }

    updateSignals() {
        // multiply by matrix
        var newSignals = new Array(this.signals.vector.length);
        var mtx = this.dna.cellTypes[this.type].signalMatrix;
        for (var i = 0; i < newSignals.length; i++) {
            for (var j = 0; j < this.signals.vector.length; j++) {
                newSignals[i] += this.signals.vector[j] * mtx[i][j];
            }
            for (j = 0; j < this.fluids.vector.length; ++j) {
                newSignals[j] += this.fluids.vector[j] * mtx[i][j+this.signals.vector.length];
            }
        }

        var vec = this.dna.cellTypes[this.type].signalB;
        for (var i = 0; i < vec.length; i++) {
            newSignals[i] += vec[i];
        }

        for (var i = 0; i < newSignals.length; i++) {
            this.signals.vector[i] = newSignals[i];
        }
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

        // if (Math.random() > 0.5) {
        //     return {
        //         name: 'grow',
        //         parameters: {
        //             direction: 'up',
        //             type: 'a1'
        //         }
        //     }
        // }
        // else if (Math.random() > 0.5) {
        //     return {
        //         name: 'grow',
        //         parameters: {
        //             direction: 'right',
        //             type: 'a2'
        //         }
        //     }
        // }
        // return {
        //     name: 'grow',
        //     parameters: {
        //         direction: 'left',
        //         type: 'a2'
        //     }
        // }

        return this.dna.chooseAction(this.fluids, this.type);
    }
}
