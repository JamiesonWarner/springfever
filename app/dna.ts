import {Cell} from "./cell";
import {Fluids} from "./fluids";

export class DNA {
    constructor() {

    }

    getSeed() {
        var seed = [];
        seed.push(new Cell(0, 0, new Fluids()));
    }
}