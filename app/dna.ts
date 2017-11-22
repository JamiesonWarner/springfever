import {Cell} from "./cell";
import {Fluids} from "./fluids";
import {Grid} from "./grid";
import {Automata} from "./automata";
import {IAction, DivideAction, PumpAction, ReactAction, SpecializeAction, ActionSerializer} from "./action";
import {Perceptron} from "./perceptron";
import {CellTypeSerializer} from "./celltypes";


/**
 * A lightweight DNA object to search over.
 * Plantrpg is searching for the maximum of fitness over the set of all possible DNA.
 *
*/
export class DNA {
  static N_CELL_TYPES: number = 5;
  static COLOR_HEX_ARRAY = ["#ededbe", "#8F8F6E", "#6E6E8F", "#8F6E7F", "#80C4A1"];

  NEW_CELL_COST = new Fluids(0.2, 0.2);

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
        cost: this.NEW_CELL_COST,
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
