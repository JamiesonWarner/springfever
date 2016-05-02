import {DNA} from "./dna";
import {Simulation} from "./simulation";
import {Cell} from "./cell";

export class Evolution extends Simulation {
    drawCanvas: Element;
    seedlings;

    generation: number = 0;

    constructor(drawCanvas: Element) {
        super(drawCanvas);
    }

    doEvolution(ngenerations:number = 4, seed?:DNA): DNA {
        if (!seed) {
            seed = new DNA();
        }

        // this.FRAME_DELAY = 20;
        // for (var i = 0; i < length; ++i) {
        //     var mutated = seed.copyAndMutate();
        //     this.runForNTicks(5);
        //     // code...
        // }
        // this.setupSimulation(mutated);



        // return seed;

        var best = seed;
        // for (var i = 0; i < ngenerations; ++i) {
            best = this.runGenerationSelectBest(10, best, 4);
        // }
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

        var i = 0;
        var self = this;
        window.setInterval(function() {
            // this function will return immediately and then run grow on all children
            self.runGenerationSelectBestHelper(nchildren, seed, growtime, children, fitness, i);
            self.generation++;
            self.updateStatus();
            i++;
        }, this.FRAME_DELAY);

        window['fitness'] = fitness;
        window['children'] = children;

        return null;
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
    runGenerationSelectBestHelper(nchildren:number, seed:DNA, growtime: number = 40, children, fitness, child_index:number) {
        this.setupSimulation(children[child_index]);
        this.runForNTicks(growtime);
        fitness[child_index] = this.evalFitness(this.automata.plant);

        // Recursive call on the next animation frame
        // if (child_index + 1 < nchildren) {
        //     var self = this;
        //     requestAnimationFrame(function() {
        //         self.runGenerationSelectBestHelper(nchildren, seed, growtime, children, fitness, child_index + 1);
        //     })
        // }
    }


    evalFitness(plant: Array<Cell>): number {
        return plant.length;
    }
}
