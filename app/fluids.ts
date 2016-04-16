
var N_FLUIDS = 2;

export class Fluids {
    vector;
    constructor(water=100) {
        this.vector = new Array(N_FLUIDS);
        for (var i = 0; i < N_FLUIDS; ++i) {
            this.vector[i] = water;
        }
    }
}
