import {DNA} from "./dna";
import {Simulation} from "./simulation";
import {Cell} from "./cell";

export class Evolution extends Simulation {
    drawCanvas: Element;

    constructor(drawCanvas: Element) {
        super(drawCanvas);
    }

    doEvolution(ngenerations:number = 4, seed?:DNA): DNA {
        if (!seed) {
            seed = new DNA();
        }
        var best = seed;
        for (var i = 0; i < ngenerations; ++i) {
            best = this.runGenerationSelectBest(10, best, 40);
        }
        return best;
    }

    runGenerationSelectBest(nchildren:number, seed:DNA, growtime: number = 40): DNA {
        // grow the seed for growtime iterations, then eval its fitness

        // generate random children
        var children: Array<DNA> = new Array(nchildren);

        // make n copies of the dna
        for (var i = 0; i < nchildren; ++i) {
            children[i] = seed.copyAndMutate();
        }

        // evaluate each one's fitness
        var fitness = new Array(nchildren);
        for (var i = 0; i < children.length; ++i) {
            this.resetSimulation();
            this.automata.plantSeed(children[i]);
            this.runForNTicks(growtime);
            fitness[i] = this.evalFitness(this.automata.plant);
        }

        // return the child with the best fitness
        var maxFitness = -Infinity;
        var bestChild = null;
        for (var i = 0; i < children.length; ++i) {
            if (fitness[i] > maxFitness) {
                maxFitness = fitness[i];
                bestChild = children[i];
            }
        }

        return bestChild;
    }

    evalFitness(plant: Array<Cell>): number {
        return plant.length;
    }
}
