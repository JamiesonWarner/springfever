import {Cell} from "./cell";
import {Fluids} from "./fluids";
import {Grid} from "./grid";

export class DNA {
  constructor() {
      window['dna'] = this;
  }

  plantSeed(grid: Grid) {
      var seed = [];
      seed.push(new Cell(this, 'a1', new Fluids(100,10000), grid, 50, 50 ));
      seed.push(new Cell(this, 'b1', new Fluids(100,10000), grid, 50, 51 ));
      return seed;
  }

  cellTypes = {
    'a1': {
      cost: new Fluids(0, 20),
      /*
      (N_SIGNALS) x (N_SIGNALS+N_FLUIDS)
      */
      signalMatrix: [
        [1,0,0,0,0.2,0.2], // auxin production depends on resources
        [0,1,1,1,0,0], // new apical contender (force apical)
        [0,0,1,0,0,0], // old apical (starts 0, goes to 1)
        [0,0,0,1,0,0], // starts 1, goes 0. Will be >0 when old if there's young.
      ],
      signalB: [-0.3,-0.5,0.05,-0.05],
      signalInit: [0,0,0,1],
      color: "#ededbe",
      actions: [
        {
          name: 'demote',
          activator: {
            w: [0,10,0,0],
            b: 0
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'up',
              type: 'a1'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 60,
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'right',
              type: 'a1'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'right',
              type: 'a2'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'left',
              type: 'a2'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'nothing',
          activator: {
            w: [-2, 0, 0, 0],
            b: 2,
          }
        }
      ]
    },
    'a2': {
      cost: new Fluids(0, 20),
      signalMatrix: [
        [0.8,0,0,0,0,0], // auxin production depends on resources
        [0,1,0,0,0,0], // new apical contender (force apical)
        [0,0,1,0,0,0], // old apical (starts 0, goes to 1)
        [0,0,0,1,0,0], // starts 1, goes 0. Will be >0 when old if there's young.
      ],
      signalB: [0.05,-0.5,0.05,0.05],
      signalInit: [0,0,0,0],
      color: "#8F8F6E",
      actions: [
        {
          name: 'grow',
          parameters: {
              direction: 'right',
              type: 'a2'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'left',
              type: 'a2'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'right',
              type: 'l'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 4,
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'left',
              type: 'l'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'nothing',
          activator: {
            w: [-2, 0, 0, 0],
            b: 2,
          }
        }
      ]
    },
    'b1': {
      cost: new Fluids(0, 20),
      signalMatrix: [
        [0.8,0,0,0,0,0], // auxin production depends on resources
        [0,1,0,0,0,0], // new apical contender (force apical)
        [0,0,1,0,0,0], // old apical (starts 0, goes to 1)
        [0,0,0,1,0,0], // starts 1, goes 0. Will be >0 when old if there's young.
      ],
      signalB: [0.05,-0.5,0.05,0.05],
      signalInit: [0,0,0,0],
      color: "#6E6E8F",
      actions: [
        {
          name: 'grow',
          parameters: {
              direction: 'down',
              type: 'b1'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'right',
              type: 'b1'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'right',
              type: 'b2'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'left',
              type: 'b2'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'nothing',
          activator: {
            w: [-2, 0, 0, 0],
            b: 2,
          }
        }
      ]
    },
    'b2': {
      cost: new Fluids(0, 20),
      signalMatrix: [
        [0.8,0,0,0,0,0], // auxin production depends on resources
        [0,1,0,0,0,0], // new apical contender (force apical)
        [0,0,1,0,0,0], // old apical (starts 0, goes to 1)
        [0,0,0,1,0,0], // starts 1, goes 0. Will be >0 when old if there's young.
      ],
      signalB: [0.05,-0.5,0.05,0.05],
      signalInit: [0,0,0,0],
      color: "#8F6E7F",
      actions: [
        {
          name: 'grow',
          parameters: {
              direction: 'right',
              type: 'b2'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'left',
              type: 'b2'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'nothing',
          activator: {
            w: [-2, 0, 0, 0],
            b: 2,
          }
        }
      ]
    },
    'l': {
      cost: new Fluids(0, 30),
      signalMatrix: [
        [0.8,0,0,0,0,0], // auxin production depends on resources
        [0,1,0,0,0,0], // new apical contender (force apical)
        [0,0,1,0,0,0], // old apical (starts 0, goes to 1)
        [0,0,0,1,0,0], // starts 1, goes 0. Will be >0 when old if there's young.
      ],
      signalB: [0.05,-0.5,0.05,0.05],
      signalInit: [0,0,0,0],
      color: "#80C4A1",
      actions: [
        {
          name: 'grow',
          parameters: {
              direction: 'right',
              type: 'l'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'left',
              type: 'l'
          },
          activator: {
            w: [20, 0, 0, 0],
            b: 2,
          }
        },
        {
          name: 'nothing',
          activator: {
            w: [-2, 0, 0, 0],
            b: 2,
          }
        }
      ]
    },
  }

  l2norm(arr) {
      var n = 0;
      for (var i = 0; i < arr.length; ++i) {
          n += arr[i] * arr[i];
      }
      return Math.sqrt(n);
  }

  l1norm(arr) {
    var n = 0;
    for (var i = 0; i < arr.length; ++i) {
      n += arr[i];
    }
    return n;
  }

  distanceToActivator(fluids, activator) {
    var normW = this.l2norm(activator.w);

    var d = 0;
    for (var i = 0; i < length; ++i) {
        d += fluids[i] * activator[i];
    }
    d += activator.b;
    return d / normW;
  }

  /*
  Sigmoid activator.
  Returns value from 0 to 1 given f from -inf to inf.
  */
  activatorFunction(v) {
      return 1 / (1 + Math.exp(-v));
  }

  weightedChoose(values, weights) {
    var norm = this.l1norm(weights);
    var rand = Math.random();
    var prob = 0;
    for (var i = 0; i < values.length; ++i) {
      var w = weights[i]/norm;
      prob += w;
      if (rand <= prob) {
        return values[i];
      }
    }
  }

  chooseAction(signals, cellType) {
    var actions = this.cellTypes[cellType].actions;
    var activators = new Array(actions.length)
    for (var i = 0; i < activators.length; ++i) {
        activators[i] = this.activatorFunction(this.distanceToActivator(signals, actions[i].activator));
    }
    // console.log('activators', activators, 'actions', actions);
    return this.weightedChoose(actions, activators);
  }
}