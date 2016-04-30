import {Fluids} from "./fluids";
import {IAction} from "./action";
import {Utils} from "./utils";

/*
Cell is a fleighweight object for the Grid. Systems.
Plus they also have context for fitting into the Grid.
It can also be thought of as a DNA controller.
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

    getActionPotential(action: IAction): number {
        return 0;
    }

    chooseAction():IAction {
        // var signals = this.signals,
        //     cellType = this.type;

        // var perceptron = this.type.

        // Calculate which actions have high potential values
        var actions = this.dna.actions;
        var potentials = new Array(actions.length);
        for (var i = 0; i < actions.length; ++i) {
            potentials[i] = this.type.actionPerceptrons[i].activate(this.fluids.vector)[0]; // this.getActionPotential(actions[i]);
        }

        var bestIndex: number = Utils.argmax(potentials);

        // console.log('choosing action, ', actions[bestIndex]);
        return actions[bestIndex];


        // for (var i = 0; i < activators.length; ++i) {
        //     activators[i] = this.activatorFunction(this.distanceToActivator(signals, actions[i].activator));
        // }
        // // console.log('activators', activators, 'actions', actions);
        // return this.weightedChoose(actions, activators);
    }
}
