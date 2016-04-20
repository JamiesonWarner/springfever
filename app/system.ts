/*
System are operators on the automata.
- methods update() and draw() are called by Simulation
- System changes state in automata
*/

import {Simulation} from "./simulation";
import {Automata} from "./automata";

export interface ISystem {
    sim: Simulation;
    automata: Automata;

    update() : void;
    draw() : void;
}

class System implements ISystem {
    sim: Simulation;
    automata: Automata;

    constructor(sim: Simulation, automata: Automata){}
    update(){}
    draw(){}

}
