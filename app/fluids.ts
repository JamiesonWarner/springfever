import {Automata} from "./automata";

export class Fluids {
    static WATER = 0;
    static GLUCOSE = 1;
    static AUXIN = 2;

    static SIGNALS_START = 2;
    static N_SIGNALS = 4;
    static N_FLUIDS = 2 + Fluids.N_SIGNALS;

    vector;

    constructor(water = Automata.MATERIAL_WATER_WATER_MEAN, glucose = 0) {

        this.vector = new Array(Fluids.N_FLUIDS);
        for (var i = 0; i < Fluids.N_FLUIDS; ++i) {
            this.vector[i] = 0;
        }

        this.vector[Fluids.WATER] = water;
        this.vector[Fluids.GLUCOSE] = glucose;
    }
}


export class Reactions {
    constructor() {}

}