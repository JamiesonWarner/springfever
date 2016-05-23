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
      // new DivideAction({ fluidGradient: [0,0,0,0,0,0], gravityGradient: 2 }),
      new PumpAction({ fluidGradient: [0,0,0,0,0,0], fluids: [1,0,0,0,0,0] }),
      // new ReactAction({ reaction: [-0.2,0.8,0.1,0,0,0] }), //photosynth
      // new ReactAction({ reaction: [0,0,0.1,0,0,0] }), // free auxin
      // new ReactAction({ reaction: [0,0,0,0.1,0,0] }), // free misc hormones
      // new ReactAction({ reaction: [0,0,0,0,0.1,0] }), // free misc hormones
      // new ReactAction({ reaction: [0,0,0,0,0,0.1] }), // free misc hormones
      // new ReactAction({ reaction: [0,0,0,-0.1,0,0] }), // free misc hormones
      // new ReactAction({ reaction: [0,0,0,0,-0.1,0] }), // free misc hormones
      // new ReactAction({ reaction: [0,0,0,0,0,-0.1] }), // free misc hormones
      // new SpecializeAction({ toType: 0 }),
      // new SpecializeAction({ toType: 1 }),
      // new SpecializeAction({ toType: 2 }),
      // new SpecializeAction({ toType: 3 }),
      // new SpecializeAction({ toType: 4 })
    ];

    // cell types
    this.cellTypes = new Array(DNA.N_CELL_TYPES);
    for (var i = 0; i < DNA.N_CELL_TYPES; ++i) {
      var actionPerceptrons = [];
      for (var j = 0; j < this.actions.length; ++j) {
        actionPerceptrons[j] = new Perceptron(Fluids.N_FLUIDS + 4, 8, 1);
      }
      this.cellTypes[i] = {
        color: DNA.COLOR_HEX_ARRAY[i%DNA.COLOR_HEX_ARRAY.length],
        isLeaf: i==4,
        cost: new Fluids(0.2, 0.2),
        actionPerceptrons: actionPerceptrons
      };
    }
  }

  clone(): DNA {
    var serial = DNASerializer.serialize(this);
    return DNASerializer.deserialize(serial);
  }

  mutate(amount: number = 1) {
    // mutate actions
    for (var i = 0; i < this.actions.length; ++i) {
      var action = this.actions[i];
      action.mutate(amount);
    }

    // mutate type controllers
    for (var i = 0; i < this.cellTypes.length; ++i) {
      var type = this.cellTypes[i];
      for (var j = 0; j < type.actionPerceptrons; ++j) {
        var p = type.actionPerceptrons[j];
        p.perturb(amount);
      }
    }
  }

  plantSeed(cellArray: Array<Array<Cell>>, fluidsArray: Array<Array<Fluids>>) {
    // compute initial fluid vectors
    var waterInitial = 20; // 1.75 * Automata.MATERIAL_WATER_WATER_MEAN;
    var glucoseInitial = 20; // 4.0;
    var fluids1 = new Fluids(waterInitial, glucoseInitial),
        fluids2 = new Fluids(waterInitial, glucoseInitial),
        fluids: Fluids;

    // reference coordinates
    var rowCenterOfGrid = Math.floor(Automata.GRID_N_ROWS / 2),
        colCenterOfGrid = Math.floor(Automata.GRID_N_COLUMNS / 2),

    // plant to create
        plant: Array<Cell> = [],
        cell: Cell,

    // iterate.
        rowStart: number = rowCenterOfGrid + 2,
        rowEnd: number = rowCenterOfGrid + 10,
        rowMid: number = Math.floor((rowStart + rowEnd) / 2),
        colStart: number = colCenterOfGrid - 2,
        colEnd: number = colCenterOfGrid + 2,
        colMid: number = Math.floor((colStart + colEnd) / 2);
    for (var row = rowStart; row < rowMid; ++row) {
      for (var col = colStart; col < colEnd; ++col) {
        if (col == colMid) continue;
        fluids = new Fluids(waterInitial, glucoseInitial);
        cell = new Cell(this, this.cellTypes[2], fluids, row, col, cellArray);
        fluidsArray[row][col] = fluids;
        cellArray[row][col] = cell;
        plant.push(cell)
      }
    }

    for (var row = rowMid; row < rowEnd; ++row) {
      for (var col = colStart; col < colEnd; ++col) {
        if (col == colMid) continue;
        fluids = new Fluids(waterInitial, glucoseInitial);
        cell = new Cell(this, this.cellTypes[3], fluids, row, col, cellArray); // different type is only change
        fluidsArray[row][col] = fluids;
        cellArray[row][col] = cell;
        plant.push(cell)
      }
    }

    // create center column
    // meristems
    for (var row = rowStart; row < rowMid; ++row) {
      var col = colMid;
      fluids = new Fluids(waterInitial, glucoseInitial);
      cell = new Cell(this, this.cellTypes[0], fluids, row, col, cellArray);
      fluidsArray[row][col] = fluids;
      cellArray[row][col] = cell;
      plant.push(cell)
    }

    for (var row = rowMid; row < rowEnd; ++row) {
      var col = colMid;
      fluids = new Fluids(waterInitial, glucoseInitial);
      cell = new Cell(this, this.cellTypes[1], fluids, row, col, cellArray);
      fluidsArray[row][col] = fluids;
      cellArray[row][col] = cell;
      plant.push(cell)
    }


    return plant;
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

}

/*
Serialization is necessary to store the results of evolution so they can be played back, saved
*/
export class DNASerializer {
  static serialize(dna: DNA): string {
    var actionsSerial = new Array(dna.actions.length);
    for (var i = 0; i < dna.actions.length; ++i) {
      actionsSerial[i] = ActionSerializer.serialize(dna.actions[i]);
    }

    var cellTypesSerial = new Array(dna.cellTypes.length);
    for (var i = 0; i < dna.cellTypes.length; ++i) {
        cellTypesSerial[i] = CellTypeSerializer.serialize(dna.cellTypes[i]);
    }

    return JSON.stringify({
      cellTypes: cellTypesSerial,
      actions: actionsSerial
    });
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
