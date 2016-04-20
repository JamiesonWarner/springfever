
var N_FLUIDS = 2;


export class Fluids {
    static N_FLUIDS = 2;
    static WATER = 0;
    static GLUCOSE = 1;
    vector;
    constructor(water = 100, glucose = 0) {
        this.vector = new Array(Fluids.N_FLUIDS);
        this.vector[Fluids.WATER] = water;
        this.vector[Fluids.GLUCOSE] = glucose;
    }
}
