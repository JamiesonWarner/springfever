
var N_SIGNALS = 4;
var N_FLUIDS = 2 + N_SIGNALS;

export class Fluids {
    static N_FLUIDS = 2;
    static WATER = 0;
    static GLUCOSE = 1;
    static AUXIN = 2;
    static SIGNALS = [];
    static SIGNALS_START = 2;

    vector;

    constructor(water = 100, glucose = 0) {

        this.vector = new Array(Fluids.N_FLUIDS);
        for (var i = 0; i < N_FLUIDS; ++i) {
            this.vector[i] = 0;
        }

        this.vector[Fluids.WATER] = water;
        this.vector[Fluids.GLUCOSE] = glucose;
    }
}


// Add signal pointers to signals array
// start at 2 to include Auxin (it's okay to have named signals)
var base = N_FLUIDS - N_SIGNALS;
for (var i = 0; i < N_SIGNALS; ++i) {
    Fluids.SIGNALS[i] = base + i;
}

export class Reactions {
    constructor() {}

}