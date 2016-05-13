import {DNA, DNASerializer} from "./dna";
import {Simulation, IViewSimulation} from "./simulation";
import {Cell} from "./cell";

/*

*/
export class Evolution extends Simulation {
    drawCanvas: Element;
    seedlings;

    fitness: Array<number>;
    bestFitness: number;
    bestDna: DNA;
    dna: DNA;
    isEvolutionRunning: boolean;

    simulation: Simulation;
    generation: number = 0;
    growtime;
    childrenPerGeneration;
    childIndex: number;

    constructor(drawCanvas: Element) {
        super(drawCanvas);
        this.simulation = new Simulation(drawCanvas);
        // this.simulatio    n.pause(); // each frame will be an entire plant of automata
        this.simulation.FRAME_DELAY = 200;
        this.isEvolutionRunning = true;
        this.dna = new DNA();
        this.runGenerationSelectBest(1000, this.dna, 150);

        // this.simulation.run();
    }

    run(dna?:DNA) {
        this.isEvolutionRunning = true;
        // if (!dna) {
        //     this.dna = new DNA();
        // }
        // this.dna = dna;
        // Run generation after generation...
        // TODO runGenerationSelectBest returns a Promise...
        // var ngenerations: number = 4;

        // var best = dna;
        // for (var i = 0; i < ngenerations; ++i) {
        // }
        // return best;
    }

    reset() {

    }

    pause() {
        this.simulation.pause();
        this.isEvolutionRunning = false;
    }

    simulatedAnnealing(nchildren, dna:DNA, growtime: number = 40): DNA {
        // TODO
        var schedule = (round) => {
            return 1 / (1 + round/1000);
        }
        return null;
    }

    runGenerationSelectBest(nchildren:number, dna:DNA, growtime: number = 40) {
        // grow the dna for growtime iterations, then eval its fitness
        // if (dna)

        // generate random children
        this.bestDna = null;
        this.bestFitness = -1;
        this.fitness = [];
        this.generation = 0;
        this.growtime = growtime;
        this.childrenPerGeneration = nchildren;
        this.childIndex = 0;
        this.runGenerationSelectBestHelper();

        var self = this;
        window['stop'] = function() {
            console.log('Stopping after ' + self.generation + ' generations. ');
            console.log('Best fitness: ', self.bestFitness);
            console.log('Best dna stored in finalBest. ');
            self.isEvolutionRunning = false;
            window['finalBest'] = self.bestDna; //DNASerializer.serialize(self.bestDna);
            window['DNASerializer'] = DNASerializer;
            window['fitness'] = self.fitness;
        };
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
    runGenerationSelectBestHelper() {
        if (this.childIndex >= this.childrenPerGeneration) {
            return;
        }
        if (!this.isEvolutionRunning) { // short-circuit out if pause is pressed
            return;
        }

        this.generation++;
        this.dna = new DNA();
        this.dna.mutate(10);

        // grow the given dna
        // console.log('growing...');
        this.simulation.reset(this.dna);
        this.updateStatus();
        // this.simulation.automata.draw();
        this.simulation.runForNTicks(this.growtime);
        // console.log('done...');

        // evaluate its fitness
        var fit = this.evalFitness(this.simulation.automata.plant);
        this.fitness[this.childIndex] = fit;

        // mark it as the best dna if applicable
        if (fit > this.bestFitness) {
            console.log('New best fitness: ', fit);
            this.bestDna = this.dna.clone();
            this.bestFitness = fit;
        }

        // schedule to grow the next dna
        var self = this;
        this.childIndex++;
        window.setTimeout(this.runGenerationSelectBestHelper.bind(this), this.simulation.FRAME_DELAY);
    }

    evalFitness(plant: Array<Cell>): number {
        var tfluids = 0;
        for (var i = 0; i < plant.length; ++i) {
            var cell: Cell = plant[i];
            tfluids += cell.sumFluids();
        }
        return tfluids;
    }
}
