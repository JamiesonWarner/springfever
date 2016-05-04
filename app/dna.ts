import {Cell} from "./cell";
import {Fluids} from "./fluids";
import {Grid} from "./grid";
import {Automata} from "./automata";
import {IAction, DivideAction, PumpAction, ReactAction, SpecializeAction, ActionSerializer} from "./action";
import {Perceptron} from "./perceptron";
import {CellTypeSerializer} from "./celltypes";

export class DNA {
  static N_CELL_TYPES: number = 5;
  static COLOR_HEX_ARRAY = ["#ededbe", "#8F8F6E", "#6E6E8F", "#8F6E7F", "#80C4A1"];

  actions: Array<IAction>;
  cellTypes;

  constructor() {
    window['dna'] = this;

    this.actions = [
      // new DivideAction({ fluidGradient: [0,0,-1,0,0,0], gravityGradient: 2 }),
      new DivideAction({ fluidGradient: [0,0,0,0,0,0], gravityGradient: 2 }),
      new DivideAction({ fluidGradient: [0,0,0,0,0,0], gravityGradient: -2 }),
      // new PumpAction({ fluidGradient: [-1,0,0.1,0,0,0] }),
      // new ReactAction({ reaction: [-0.2,0.8,0.1,0,0,0] }), //photosynth
      // new ReactAction({ reaction: [0,0,0.1,0,0,0] }), // free auxin
      // new ReactAction({ reaction: [0,0,0,0.1,0,0] }), // free misc hormones
      // new ReactAction({ reaction: [0,0,0,0,0.1,0] }), // free misc hormones
      // new ReactAction({ reaction: [0,0,0,0,0,0.1] }), // free misc hormones
      // new ReactAction({ reaction: [0,0,0,-0.1,0,0] }), // free misc hormones
      // new ReactAction({ reaction: [0,0,0,0,-0.1,0] }), // free misc hormones
      // new ReactAction({ reaction: [0,0,0,0,0,-0.1] }), // free misc hormones
      // new SpecializeAction({ toType: 0 }),
      // new SpecializeAction({ toType: 1 })
    ];

    // cell types
    this.cellTypes = new Array(DNA.N_CELL_TYPES);
    for (var i = 0; i < DNA.N_CELL_TYPES; ++i) {
      var actionPerceptrons = [];
      for (var j = 0; j < this.actions.length; ++j) {
        actionPerceptrons[j] = new Perceptron(Fluids.N_FLUIDS, 8, 1);
      }
      this.cellTypes[i] = {
        color: DNA.COLOR_HEX_ARRAY[i%DNA.COLOR_HEX_ARRAY.length],
        isLeaf: i==1,
        cost: new Fluids(0.2, 0.2),
        actionPerceptrons: actionPerceptrons
      };
    }
  }

  clone(): DNA {
    var serial = DNASerializer.serialize(this);
    return DNASerializer.deserialize(serial);
  }

  copyAndMutate(amount: number = 1): DNA {
    var dna = this.clone();

    // mutate actions
    for (var i = 0; i < dna.actions.length; ++i) {
      var action = dna.actions[i];
      action.mutate(amount);
    }

    // mutate type controllers
    for (var i = 0; i < dna.cellTypes.length; ++i) {
      var type = dna.cellTypes[i];
      for (var j = 0; j < type.actionPerceptrons; ++j) {
        var p = type.actionPerceptrons[j];
        p.perturb(amount);
      }
    }

    return new DNA();
  }

  plantSeed(grid: Array<Array<Cell>>) {
    var waterInitial = 1.75 * Automata.MATERIAL_WATER_WATER_MEAN;
    var glucoseInitial = 20; // 4.0;
    var rowCenter = Math.floor(Automata.GRID_N_ROWS / 2),
        colCenter = Math.floor(Automata.GRID_N_COLUMNS / 2),
        row1 = rowCenter + 2,
        row2 = rowCenter + 3,
        col1 = colCenter,
        col2 = colCenter;

    var c1 = new Cell(this, 0, new Fluids(waterInitial,glucoseInitial), row1, col1),
        c2 = new Cell(this, 1, new Fluids(waterInitial,glucoseInitial), row2, col2);
    var seed = [c1, c2];
    grid[c1.row][c1.col] = c1;
    grid[c2.row][c2.col] = c2;
    return seed;
  }



  /*
In nature, the gene controls the transcription product, and .


Inputs of a cell:
- Fluids
- Fluids gradient...

Actions of a cell:

DNA is a list of potential actions:
- Reproduce (directional), direction specified as vector multiplier of fluids
- Pump fluids (directional), direction specified as vector multiplier of fluids
- Reactions
- Specialize

CellType is the controller of DNA and determines when gene products are made.
Each cell type is also a 2 layer neural net, which takes as input the fluid vector.
Each cell type has a list of potential actions, which may be paramaterized by neighbor states.
Transitions between cell types can be modeled as a markov chain, though some states are unreachable once left.
  */

  /*
  For every action, celltypes has a neural net
  */

  /*
  Serialization is necessary to store the results of evolution so they can be played back, saved
  */
  serialize(): string {
    var actionsSerial = new Array(this.actions.length);
    for (var i = 0; i < this.actions.length; ++i) {
      actionsSerial[i] = ActionSerializer.serialize(this.actions[i]);
    }

    return JSON.stringify({
      cellTypes: this.cellTypes, // cellTypes are plain objects so I think this is OK.. perceptrons though?
      actions: actionsSerial
    });
  }
}

class DNASerializer {
  static serialize(dna: DNA): string {
      return "";
  }

  static deserialize(serialized: string): DNA {
    var d = new DNA();
    var o = JSON.parse(serialized);

    var actionsSerial = o.actions;
    var actions = new Array(actionsSerial.length);
    for (var i = 0; i < actionsSerial.length; ++i) {
      actions[i] = ActionSerializer.deserialize(actionsSerial[i]);
    }

    var cellTypesSerial = o.cellTypes;
    var cellTypes = new Array(cellTypesSerial.length);
    for (var i = 0; i < cellTypes.length; ++i) {
      cellTypes[i] = CellTypeSerializer.deserialize(cellTypesSerial[i]);
    }

    d.cellTypes = cellTypes;
    d.actions = actions;
    return d;
  }
}
