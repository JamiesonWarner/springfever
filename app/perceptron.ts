import {Utils} from "./utils";

/**
Synaptic libs
*/
declare module Architect {
    class Perceptron {
        constructor(...nnodes)
        trainer;
        layers;
        activate(...input);
    }
}

declare class Neuron {
    bias: number
}

declare class Connection {
    weight: number
}


/*

*/
export class Perceptron extends Architect.Perceptron {
    constructor(...nnodes) {
        super(...nnodes);
    }

    perturb(amount: number = 1.0) {
        // perturb every weight by ~amount

        // iterate through layers connections
        var connections: Array<Connection> = this.layers.input.connectedTo[0].list
        .concat(connections = this.layers.hidden[0].connectedTo[0].list);
        for (var i = 0; i < connections.length; ++i) {
            var connection = connections[i];
            connection.weight += 2 * Math.random() * amount - amount;
        }

        // iterate through neurons
        var neurons: Array<Neuron> = this.layers.input.list
        .concat(this.layers.hidden[0].list)
        .concat(this.layers.output.list);
        for (var i = 0; i < neurons.length; ++i) {
            neurons[i].bias += 2 * Math.random() * amount - amount;
        }

        // for (var i = 0; i < this.weights.length; ++i) {
        //     for (var j = 0; j < this.weights[i].length; ++j) {
        //         for (var k = 0; k < this.weights[i][j].length; ++k) {
        //             this.weights[i][j][k] += 2 * Math.random() * amount - amount;
        //         }
        //     }
        // }
    }
}
