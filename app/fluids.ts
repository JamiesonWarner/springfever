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

    sumFluids(): number {
        var s = 0;
        for (var i = 0; i < this.vector.length; ++i) {
            s += this.vector[i];
        }
        return s;
    }

    getPressureInArea(area: number): number {
        return this.sumFluids() / area;
    }



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

