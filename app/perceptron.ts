import {Utils} from "./utils";

declare module Architect {
    class Perceptron {
        constructor(...nnodes)
        trainer;
        layers;
        activate(...input);
    }
}

export class Perceptron extends Architect.Perceptron {
    constructor(...nnodes) {
        super(...nnodes);
    }

    perturb(amount: number = 1.0) {
        // perturb every weight by ~amount
        // for (var i = 0; i < this.weights.length; ++i) {
        //     for (var j = 0; j < this.weights[i].length; ++j) {
        //         for (var k = 0; k < this.weights[i][j].length; ++k) {
        //             this.weights[i][j][k] += 2 * Math.random() * amount - amount;
        //         }
        //     }
        // }
    }
}

// export class Perceptron {
//     // perceptron is a list of layers.
//     // each layer is a list of nodes, each node (k+1) weight values, where k is the # nodes in the previous layer
//     // layers array will have #layers - 1 values because the input layer has no weights

//     // [
//     //     [[0,0],[0,0]], // hidden 1
//     //     [[0,0,0]]  // output
//     // ]
//     weights: Array<Array<Array<number>>>;
//     nlayers: Array<number>; // array of the # nodes in each layer, INCLUDING the input layer.

//     netValues: Array<Array<number>>;

//     constructor(...args: number[]) {
//         var nlayers = args.length;

//         this.weights = new Array(nlayers-1);
//         for (var i = 1; i < nlayers; ++i) {
//             var nnodes = args[i],
//                 prevNodes = args[i - 1];
//             this.weights[i-1] = new Array(nnodes);
//             for (var j = 0; j < nnodes; ++j) {
//                 this.weights[i-1][j] = new Array(prevNodes + 1); // input + constant
//                 for (var k = 0; k < prevNodes + 1; ++k) {
//                     this.weights[i-1][j][k] = 0;
//                 }
//             }
//         }

//         this.netValues = new Array(nlayers - 1);
//         for (var i = 1; i < nlayers; ++i) {
//             this.netValues[i-1] = new Array(args[i]);
//         }
//     }

//     clone(): Perceptron {
//         // assume weight equivilancy
//         var p = new (Function.prototype.bind.apply(Perceptron, this.nlayers));
//         for (var i = 0; i < this.weights.length; ++i) {
//             for (var j = 0; j < this.weights[i].length; ++j) {
//                 for (var k = 0; k < this.weights[i][j].length; ++k) {
//                     p.weights[i][j][k] = this.weights[i][j][k];
//                 }
//             }
//         }
//         return p;
//     }

//     perturb(amount: number = 1.0) {
//         // perturb every weight by ~amount
//         for (var i = 0; i < this.weights.length; ++i) {
//             for (var j = 0; j < this.weights[i].length; ++j) {
//                 for (var k = 0; k < this.weights[i][j].length; ++k) {
//                     this.weights[i][j][k] += 2 * Math.random() * amount - amount;
//                 }
//             }
//         }
//     }

//     net(input: Array<number>): number {
//         // var mtx = this.type.signalMatrix;
//         // for (var i = 0; i < newSignals.length; i++) {
//         //     for (var j = 0; j < Fluids.N_SIGNALS; j++) { // first SIGNALS columns of matrix...
//         //         newSignals[i] += this.fluids.vector[j+Fluids.SIGNALS_START] * mtx[i][j];
//         //     }
//         //     for (j = 0; j < this.fluids.vector.length; ++j) {
//         //         newSignals[i] += this.fluids.vector[j] * mtx[i][j+this.signals.vector.length];
//         //     }
//         // }

//         // iterate through each layer of weights
//         var inlayer = input;
//         var outlayer;
//         for (var i = 0; i < this.netValues.length; ++i) {
//             outlayer = this.netValues[i];
//             var layerWeights = this.weights[i];
//             for (var j = 0; j < layerWeights.length; ++j) {
//                 // weights for the node
//                 var weights = layerWeights[j];
//                 var sum = weights[0];
//                 for (var k = 0; k < inlayer.length; ++k) {
//                     sum += inlayer[k] * weights[k+1];
//                 }
//                 outlayer[j] = sum; // VectorUtils.activatorFunction(sum);
//             }
//             inlayer = this.netValues[i];
//         }

//         console.log('computing net funciton', this.netValues, this.weights, outlayer);
//         return outlayer.slice();
//     }

// }

