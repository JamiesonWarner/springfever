import {Automata} from "./automata";

export class Fluids {
    static WATER = 0;
    static GLUCOSE = 1;
    static CHLOROPLASTS = 2;
    static AUXIN = 3;

    static SIGNALS_START = 3;
    static N_SIGNALS = 4;
    static N_FLUIDS = 3 + Fluids.N_SIGNALS;

    vector;

    constructor(...vec) {
        this.vector = new Array(Fluids.N_FLUIDS);
        for (var i = 0; i < Fluids.N_FLUIDS; ++i) {
            this.vector[i] = vec[i] || 0;
        }
    }

    // getPressureInArea(area: number): number {
    //     return this.sumFluids() / area;
    // }



    /*
    Goal:  q
    */

    /*
    Returns the quantity of a given fluid, which is the amount of a substance per unit volume.
    divided by the total fluid.

    */

    /*

    */
    getFluidConcentration(fluidId, area) {

    }

    /*
    Diffusive flux is rate of flow per unit area. Positive value means outward flow.

    Fick's law of diffusion: J = -D (d phi)/(d x)
    J is diffusive flux
    D is diffusion coefficient
    phi is amount of
    x is position
    */
    getDiffusiveFlux(toFluid, area1, area2){}
}

