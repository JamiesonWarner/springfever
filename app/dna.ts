import {Cell} from "./cell";
import {Fluids} from "./fluids";

export class DNA {
  constructor() {
      window['dna'] = this;
  }

  getSeed() {
      var seed = [];
      seed.push(new Cell(50, 50, new Fluids(), 'a1', this));
      seed.push(new Cell(50, 51, new Fluids(), 'b1', this));
      return seed;
  }

  /*
  (N_SIGNALS) x (N_SIGNALS+N_FLUIDS)
  */
  signalMatrix = [
    [], // apical auxin
    [0,1], // nonapical auxin
    [0,0,0,0,0,0], // ??
    [0,0,0,0,0,0], // ??
  ];

  signalB = [-0.25,-0.25,-0.25,-0.25];

  cellTypes = {
    'a1': {
      color: "#ededbe",
      actions: [
        {
          name: 'grow',
          parameters: {
              direction: 'up',
              type: 'a1'
          },
          activator: {
            w: [2, 2],
            b: 2,
          }
        },
        {
          name: 'grow',
          parameters: {
              direction: 'right',
              type: 'a1'
          },
          activator: {
            w: [2, 2],
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
            w: [2, 2],
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
            w: [2, 2],
            b: 2,
          }
        }
      ]
    },
    'a2': {
      color: "#8F8F6E",
      actions: [
        {
          name: 'grow',
          parameters: {
              direction: 'right',
              type: 'a2'
          },
          activator: {
            w: [2, 2],
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
            w: [2, 2],
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
            w: [2, 2],
            b: 2,
          }
        }
      ]
    },
    'b1': {
      color: "#6E6E8F",
      actions: [
        {
          name: 'grow',
          parameters: {
              direction: 'down',
              type: 'b1'
          },
          activator: {
            w: [2, 2],
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
            w: [2, 2],
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
            w: [2, 2],
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
            w: [2, 2],
            b: 2,
          }
        }
      ]
    },
    'b2': {
      color: "#8F6E7F",
      actions: [
        {
          name: 'grow',
          parameters: {
              direction: 'right',
              type: 'b2'
          },
          activator: {
            w: [2, 2],
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
            w: [2, 2],
            b: 2,
          }
        }
      ]
    },
    'l': {
      color: "#80C4A1",
      actions: [
        {
          name: 'grow',
          parameters: {
              direction: 'right',
              type: 'l'
          },
          activator: {
            w: [2, 2],
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
            w: [2, 2],
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

  chooseAction(fluids, cellType) {
    var actions = this.cellTypes[cellType].actions;
    var activators = new Array(actions.length)
    for (var i = 0; i < activators.length; ++i) {
        activators[i] = this.activatorFunction(this.distanceToActivator(fluids, actions[i].activator));
    }
    // console.log('activators', activators, 'actions', actions);
    return this.weightedChoose(actions, activators);
  }
}