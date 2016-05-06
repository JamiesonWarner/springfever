import {DNA, DNASerializer} from "./dna";
import {Simulation} from "./simulation";
import {Cell} from "./cell";

export class Evolution extends Simulation {
    drawCanvas: Element;
    seedlings;

    fitness: Array<number>;
    bestFitness: number;
    bestSeed: DNA;
    evolving: boolean;

    generation: number = 0;

    constructor(drawCanvas: Element) {
        super(drawCanvas);
    }

    doEvolution(ngenerations:number = 4, seed?:DNA): DNA {
        if (!seed) {
            seed = new DNA();
        }

        this.FRAME_DELAY = 200;
        // for (var i = 0; i < length; ++i) {
        //     var mutated = seed.copyAndMutate();
        //     this.runForNTicks(5);
        //     // code...
        // }
        // this.setupSimulation(mutated);



        // return seed;

        var best = seed;
        // for (var i = 0; i < ngenerations; ++i) {
            this.runGenerationSelectBest(100, best, 40);
        // }
        return best;
    }

    simulatedAnnealing(nchildren, seed:DNA, growtime: number = 40): DNA {
        // TODO
        var schedule = (round) => {
            return 1 / (1 + round/1000);
        }
        return null;
    }

    runGenerationSelectBest(nchildren:number, seed:DNA, growtime: number = 40) {
        // grow the seed for growtime iterations, then eval its fitness

        // generate random children
        this.bestSeed = null;
        this.bestFitness = -1;
        this.fitness = [];
        this.generation = 0;
        this.evolving = true;
        this.runGenerationSelectBestHelper(nchildren, seed, growtime, 0);

        var self = this;
        window['stop'] = function() {
            console.log('Stopping after ' + self.generation + ' generations. ');
            console.log('Best fitness: ', self.bestFitness);
            console.log('Best seed (serialized) stored in finalBest. ');
            self.evolving = false;
            window['finalBest'] = DNASerializer.serialize(self.bestSeed);
        };
        window['fitness'] = this.fitness;
    }

    updateStatus() {
        let status;
        if (this.isSimulationRunning)
            status = 'Simulation running. ';
        else
            status = 'Simulation stopped. ';
        if (!this.drawEnabled)
            status += '(Draw disabled.) ';
        status += "Generation " + this.generation + ". ";
        this.showStatusString(status);
    }

    /* Recursive function */
    runGenerationSelectBestHelper(nchildren:number, seed:DNA, growtime: number = 40, child_index:number) {
        if (child_index >= nchildren) {
            return;
        }
        if (!this.evolving) {
            return;
        }

        this.generation++;
        this.updateStatus();

        // grow the given seed
        this.setupSimulation(seed);
        this.runForNTicks(growtime);

        // evaluate its fitness
        var fit = this.evalFitness(this.automata.plant);
        this.fitness[child_index] = fit;

        // mark it as the best seed if applicable
        if (fit > this.bestFitness) {
            console.log('New best fitness: ', fit);
            this.bestSeed = seed.clone();
            this.bestFitness = fit;
        }

        // schedule to grow the next seed
        var self = this;
        window.setTimeout(function() {
            seed.mutate(1);
            self.runGenerationSelectBestHelper(nchildren, seed, growtime, child_index + 1);
        }, this.FRAME_DELAY);
    }

    evalFitness(plant: Array<Cell>): number {
        return plant.length;
    }
}
