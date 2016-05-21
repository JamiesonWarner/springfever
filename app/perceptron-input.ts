export interface PerceptronInput {
    getInputVector(): Array<number> {

    }
}

// takes data from genes
export class PerceptronInputs {
    inputs: Array<PerceptronInput>;
    inputMask: Object{ [key:number]:boolean };

    constructor()

    getVector(): Array<number> {
        // iterate through input vectors of inputs
        return this.inputs.map(function(input: PerceptronInput) {
            return input.getInputVector();
        }).reduce(function(prev, curr) {
            return prev.concat(curr); // flatten
        });
    }
}