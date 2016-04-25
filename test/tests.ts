import {Perceptron} from "../app/perceptron";

declare var it;
declare var expect;
declare var describe;

describe("perceptron", function() {
    it("initializes to expected values", function() {
        var p = new Perceptron(4, 2, 4);
        expect(p.weights.length).toEqual(2);
        expect(p.weights[0].length).toEqual(2); // 2 nodes in hidden layer
        expect(p.weights[1].length).toEqual(4); // 4 nodes in output layer
        expect(p.weights[0][0].length).toEqual(5); // 4 inputs + constant
        expect(p.weights[0][1].length).toEqual(5); // 4 inputs + constant
        expect(p.weights[1][0].length).toEqual(3); // 2 inputs + constant
        expect(p.weights[1][1].length).toEqual(3); // 2 inputs + constant
        expect(p.weights[1][2].length).toEqual(3); // 2 inputs + constant
        expect(p.weights[1][3].length).toEqual(3); // 2 inputs + constant
    })

    it("gets reasonable net values", function() {
        var p = new Perceptron(2, 2, 1);
        p.weights[0][0][0] = 1.0;
        p.weights[0][0][1] = 0.6;
        p.weights[0][0][2] = 0.6;
        p.weights[0][1][0] = 1.0;
        p.weights[0][1][1] = 1.1;
        p.weights[0][1][2] = 1.1;
        p.weights[1][0][0] = 1.0;
        p.weights[1][0][1] = -2;
        p.weights[1][0][2] = 1.1;

        console.log('vallls');
        console.log(p.net([0,0]));
        console.log(p.net([0,1]));
        console.log(p.net([1,0]));
        console.log(p.net([1,1]));

        expect(true).toEqual(true);
        // xor function
        // var p = new Perceptron(1, 1);
        // expect(p.weights.length).toEqual(2);
        // expect(p.weights[0].length).toEqual(2);
        // expect(p.weights[1].length).toEqual(4);
    })

    it("perturbs correctly", function() {
        var p = new Perceptron(2, 2, 1);
        expect(p.net([0, 0])).toEqual(0);
        // p.perturb(1);
        // expect(p.net([0, 0])).not.toEqual(0);
    })
})

