import {DNA, DNASerializer} from "./dna";
import {Simulation, IViewSimulation} from "./simulation";
import {Cell} from "./cell";

export class Evolution implements IViewSimulation {
    drawCanvas: Element;
    seedlings;

    fitness: Array<number>;
    bestFitness: number;
    bestSeed: DNA;
    seed: DNA;
    isEvolutionRunning: boolean;



    simulation: Simulation;
    generation: number = 0;
    growtime;
    childrenPerGeneration;

    constructor(drawCanvas: Element) {
        this.simulation = new Simulation(drawCanvas);
        this.simulation.pause(); // each frame will be an entire plant of automata
        this.simulation.FRAME_DELAY = 200;
    }

    run(seed?:DNA) {
        if (!seed) {
            this.seed = new DNA();
        }
        this.seed = seed;
        // Run generation after generation...
        // TODO runGenerationSelectBest returns a Promise...
        // var ngenerations: number = 4;

        // var best = seed;
        // for (var i = 0; i < ngenerations; ++i) {
            this.runGenerationSelectBest(100, this.seed, 40);
        // }
        // return best;
    }

    reset() {

    }

    pause() {
        this.simulation.pause();
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
        this.growtime = growtime;
        this.childrenPerGeneration = nchildren;
        this.runGenerationSelectBestHelper(0);

        var self = this;
        window['stop'] = function() {
            console.log('Stopping after ' + self.generation + ' generations. ');
            console.log('Best fitness: ', self.bestFitness);
            console.log('Best seed (serialized) stored in finalBest. ');
            self.isEvolutionRunning = false;
            window['finalBest'] = DNASerializer.serialize(self.bestSeed);
        };
        window['fitness'] = this.fitness;
    }

    updateStatus() {
        let status;
        if (this.isEvolutionRunning)
            status = 'Simulation running. ';
        else
            status = 'Simulation stopped. ';
        if (!this.simulation.drawEnabled)
            status += '(Draw disabled.) ';
        status += "Generation " + this.generation + ". ";
        this.simulation.showStatusString(status); // TODO move this out of simulation somehow?
    }

    /* Recursive function */
    runGenerationSelectBestHelper(child_index:number) {
        if (child_index >= this.childrenPerGeneration) {
            return;
        }
        if (!this.isEvolutionRunning) { // short-circuit out if pause is pressed
            return;
        }

        this.generation++;
        this.updateStatus();

        // grow the given seed
        this.simulation.reset(this.seed);
        this.simulation.runForNTicks(this.growtime);

        // evaluate its fitness
        var fit = this.evalFitness(this.simulation.automata.plant);
        this.fitness[child_index] = fit;

        // mark it as the best seed if applicable
        if (fit > this.bestFitness) {
            console.log('New best fitness: ', fit);
            this.bestSeed = this.seed.clone();
            this.bestFitness = fit;
        }

        // schedule to grow the next seed
        var self = this;
        window.setTimeout(function() {
            this.seed.mutate(1);
            self.runGenerationSelectBestHelper(child_index + 1);
        }, this.simulation.FRAME_DELAY);
    }

    evalFitness(plant: Array<Cell>): number {
        return plant.length;
    }
}
