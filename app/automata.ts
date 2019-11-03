import {DNA} from "./dna";
import {Cell} from "./cell"
import {Dirt} from "./dirt";
import {Fluids} from "./fluids";
import {ISystem} from "./system";
import {IAction, DivideAction, ReactAction, SpecializeAction, PumpAction} from "./action";
import {Angle} from "./angle";

function hex(byte){
  let colorString = "";
  if (byte < 16) {
    colorString += "0" + byte.toString(16);
  }
  else {
    colorString += byte.toString(16);
  }
  return colorString;
}

function interpColors(colors, weights) {
  /*colors - a list of string hex representations, e.g., #0f5e9c
  weights - a list of values from 0 to 1
  */
  // Create the color
  var channels = []
  for (var chan=0; chan<3; chan++) {
    var weightedSumInChannel = 0.0
    for (var i=0; i<colors.length; i++) {
      let color = colors[i],
          weight = weights[i]
      let channelAmount = parseInt(color.slice(1+2*chan, 3+2*chan), 16)
      weightedSumInChannel += Math.round(channelAmount * weight)
    }
    channels.push(weightedSumInChannel)
  }

  // Add a white fill background
  let sumWeights = 0.0
  for (const weight of weights) {
    sumWeights += weight
  }
  let fillAmount = Math.max(0, 1.0 - sumWeights)
  for (var chan=0; chan<3; chan++) {
    channels[chan] += Math.floor(255*fillAmount)
  }

  // Convert the color to a hex code
  return "#" + hex(channels[0]) + hex(channels[1]) + hex(channels[2])
}

/*
TODO turn Automata into systems model.
Automata is a place for shared state.
Automata just stores stuff like the fluidsArray, and its state is transformed by Systems.
*/
export class Automata {
  static GRID_N_COLUMNS = 120;
  static GRID_N_ROWS = 100;
  static CELL_SCALE_PIXELS = 8;

  // used to estimate turgidity. Wolfram Alpha: mass of 1cm^3 water
  static MATERIAL_WATER_WATER_MEAN = 1.0;
  // Wolfram Alpha: mass of 1 cm^3 moist soil - Wolfram Alpha: mass of 1cm^3 dry soil;
  static MATERIAL_DIRT_WATER_MEAN = 0.21;
  // Wolfram Alpha: mass of water vapor in 1 cubic centimer air;
  static MATERIAL_AIR_WATER_MEAN = 1.519e-5;

  canvas;
  canvasCtx: CanvasRenderingContext2D;
  fluidsArray: Array<Array<Fluids>>;
  cellArray: Array<Array<Cell>>; // undefined if there is no cell
  plant: Array<Cell>;
  dna;

  drawStyle: string;

  systems: Array<ISystem>;

  constructor(runString: String, drawCanvas: Element) {
    this.systems = new Array();

    this.canvas = drawCanvas;
    this.canvas.setAttribute('width', Automata.GRID_N_COLUMNS * Automata.CELL_SCALE_PIXELS);
    this.canvas.setAttribute('height', Automata.GRID_N_ROWS * Automata.CELL_SCALE_PIXELS);
    this.canvasCtx = this.canvas.getContext("2d");

    this.fluidsArray = new Array(Automata.GRID_N_ROWS);
    for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
      this.fluidsArray[row] = new Array(Automata.GRID_N_COLUMNS);
      for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {

    // create fluid for each location in the fluids array
    var water;
    if (this.isDirtCell(row, col))
      water = Automata.MATERIAL_DIRT_WATER_MEAN
    // Uncomment line to make a random amount of starting water
    // water = Math.random() * 2 * Automata.MATERIAL_DIRT_WATER_MEAN;
    else
      water = Automata.MATERIAL_AIR_WATER_MEAN
    // Uncomment line to make a random amount of starting water
    // water = Math.random() * 2 * Automata.MATERIAL_AIR_WATER_MEAN;
    this.fluidsArray[row][col] = new Fluids(water, 0);
    }
    }

    this.cellArray = new Array(Automata.GRID_N_ROWS);
    for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
      this.cellArray[row] = new Array(Automata.GRID_N_COLUMNS);
    // for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
    //   this.cellArray[row][col] == undefined;
    // }
    }

    var self = this;
    drawCanvas.addEventListener("mousemove", function(event: MouseEvent) {
      self.showInfo(event.offsetX, event.offsetY);
    })
  }

  makeCellsAtCoordinates  (cellArray: Array<Array<Cell>>, fluidsArray: Array<Array<Fluids>>) {
    // compute initial fluid vectors
    var waterInitial = 20; // 1.75 * Automata.MATERIAL_WATER_WATER_MEAN;
    var glucoseInitial = 20; // 4.0;
    var fluids: Fluids;

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
        cell = new Cell(this, this.dna.cellTypes[2], fluids, row, col, cellArray);
        fluidsArray[row][col] = fluids;
        cellArray[row][col] = cell;
        plant.push(cell)
      }
    }

    for (var row = rowMid; row < rowEnd; ++row) {
      for (var col = colStart; col < colEnd; ++col) {
        if (col == colMid) continue;
        fluids = new Fluids(waterInitial, glucoseInitial);
        cell = new Cell(this, this.dna.cellTypes[3], fluids, row, col, cellArray); // different type is only change
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
      cell = new Cell(this, this.dna.cellTypes[0], fluids, row, col, cellArray);
      fluidsArray[row][col] = fluids;
      cellArray[row][col] = cell;
      plant.push(cell)
    }

    for (var row = rowMid; row < rowEnd; ++row) {
      var col = colMid;
      fluids = new Fluids(waterInitial, glucoseInitial);
      cell = new Cell(this, this.dna.cellTypes[1], fluids, row, col, cellArray);
      fluidsArray[row][col] = fluids;
      cellArray[row][col] = cell;
      plant.push(cell)
    }


    return plant;
  }

  plantSeed(seed:DNA) {
    // remove all existing plants and add the specified seed
    for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
      for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
        this.cellArray[row][col] = undefined;
      }
    }
    this.plant = seed.plantSeed(this.cellArray, this.fluidsArray);
    this.dna = seed;
  }

  isAirCell(row,col) {
    return row < 50;
  }
  isDirtCell(row,col) {
    return row >= 50;
  }

  printGridFluids() {
    for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
      for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
        console.log(this.fluidsArray[row][col].vector);
      }
    }
  }

  validateFluidsArray() {
    for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
      for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
        var f = this.fluidsArray[row][col].vector;
        if (typeof f === 'undefined') console.log('row,col are: ', row, col);
        for (var k = 0; k < f.length; ++k) {
          if (typeof f[k] !== 'number' || isNaN(f[k])) {
            throw new Error('Error: Invalid fluid vector at: ' + row+', '+col);
          }
          if (f[k] < 0) {
            console.log('Warning: Negative fluids at: ', row, col);
            return;
          }
        }
      }
    }
  }

  showInfo(x,y) {
    var tx = x / Automata.CELL_SCALE_PIXELS;
    var ty = y / Automata.CELL_SCALE_PIXELS;
    var row = Math.floor(ty);
    var col = Math.floor(tx)
    var fluids = this.fluidsArray[row][col];
    document.getElementById('bar-water').style.width = fluids.vector[Fluids.WATER] + 'px';
    document.getElementById('bar-glucose').style.width = fluids.vector[Fluids.GLUCOSE] + 'px';
    document.getElementById('bar-auxin').style.width = (40*fluids.vector[Fluids.AUXIN]) + 'px';
    document.getElementById('text-water').innerHTML = "" + fluids.vector[Fluids.WATER];
    document.getElementById('text-glucose').innerHTML = "" + fluids.vector[Fluids.GLUCOSE];
    document.getElementById('text-auxin').innerHTML = "" + fluids.vector[Fluids.AUXIN];

  }

  update() {
    //console.log("tick");
    // if (this.plant.length)
    //   console.log('cell fluids', this.plant[0].fluids.vector);


    this.doCellActions();
    this.doPassiveFlowAndPhotosynthesis();
    this.doCellMetabolism();
    this.cellDeath();

    // this.signalsUpdate();
  }

  doCellActions() {
    // Calc actions on this frame
    var actions = new Array(this.plant.length);
    var cell: Cell;
    for (var i = 0; i < this.plant.length; i++) {
      cell = this.plant[i];
      actions[i] = cell.chooseAction();
    // if (actions[i]) {
    //   console.log(actions[i]);
    // }
    }

    // Apply actions on this frame
    for (var i = 0; i < actions.length; i++) {
      if (!actions[i]) {
        continue; // cell chose to do nothing
      }
      var action = actions[i];
      var cell = this.plant[i];
      // console.log(action);
      if(action instanceof DivideAction) {
        // console.log("cell wants to grow...")
        var daction: DivideAction = action;

        // calculate direction of this action

        var neighborUp = this.fluidsArray[cell.row - 1][cell.col];
        var neighborRight = this.fluidsArray[cell.row][cell.col + 1];
        var neighborDown = this.fluidsArray[cell.row + 1][cell.col];
        var neighborLeft = this.fluidsArray[cell.row][cell.col - 1];
        var angle: number = daction.getActionDirection(neighborUp, neighborRight, neighborDown, neighborLeft);

        var direction = Angle.sampleDirection(angle);
        var drow = Angle.directionDeltaRow(direction);
        var dcol = Angle.directionDeltaCol(direction);

        var gI = this.plant[i].row + drow;
        var gJ = this.plant[i].col + dcol;

        var cost = cell.type.cost;

        var canAfford = true;
        for (var j = 0; j < cost.vector.length; j++) {
          if(this.plant[i].fluids.vector[j] < cost.vector[j]) {
            canAfford = false;
            break;
          }
        }
        if (!canAfford) {
          // console.log("cell can't afford...")
          continue;
        }

        if(gI < 0 || gI >= Automata.GRID_N_ROWS || gJ < 0 || gJ >= Automata.GRID_N_COLUMNS ){
          // console.log("cannot make cell at " + gJ + ", " + gI);
          continue;
        }

        if (this.cellArray[gI][gJ]) {
          // console.log("cell already exists at " + gJ + ", " + gI);
          continue;
        }


        this.subtractFluids(cell.fluids, cost);
        var newFluids = this.splitFluids(cell.fluids);
        var nCell = new Cell(this.dna, cell.type, newFluids, gI, gJ, this.cellArray);
        this.plant.push(nCell);
        this.fluidsArray[gI][gJ] = newFluids;
        this.cellArray[gI][gJ] = nCell;
      }

      // else if (action instanceof ReactAction) {
      //   for (var i = 0; i < length; ++i) {
      //     // code...
      //   }
      // }

      else if (action instanceof SpecializeAction) {
        var saction: SpecializeAction = action;
        cell.setType(saction.toType);
      }

      else if (action instanceof PumpAction) {
        console.log('pumping....');
        var paction: PumpAction = action;
        var neighborUp = this.fluidsArray[cell.row - 1][cell.col];
        var neighborRight = this.fluidsArray[cell.row][cell.col + 1];
        var neighborDown = this.fluidsArray[cell.row + 1][cell.col];
        var neighborLeft = this.fluidsArray[cell.row][cell.col - 1];
        // console.log('a');
        var angle: number = paction.getActionDirection(neighborUp, neighborRight, neighborDown, neighborLeft);
        // console.log('b');
        var direction = Angle.sampleDirection(angle);
        var drow = Angle.directionDeltaRow(direction);
        var dcol = Angle.directionDeltaCol(direction);
        var gI = this.plant[i].row + drow;
        var gJ = this.plant[i].col + dcol;
        if(gI < 0 || gI >= Automata.GRID_N_ROWS || gJ < 0 || gJ >= Automata.GRID_N_COLUMNS ){
          continue;
        }
        // console.log('c');
        var targetFluidVec = this.fluidsArray[gI][gJ].vector;
        var fluidVec = cell.fluids.vector;
        for (var j = 0; j < paction.fluids.length; ++j) {
        // move d fluids from fluidVec to targetFluidVec
        // if d is negative then this is "pulling" fluids
        var d = paction.fluids[j];
        // let the plant "cheat": only pump *from* environment, *to* other plant cells
        if (this.cellArray[gI][gJ]) {
          d = Math.abs(d);
        } else {
          d = -Math.abs(d);
        }

        // don't pump to negative fluids
        if (d > 0) {
          d = Math.min(d, fluidVec[j]);
        }
        else {
          d = Math.max(d, -targetFluidVec[j]);
        }
        fluidVec[j] -= d;
        targetFluidVec[j] += d;
        }
      }
  }
  }

  /*
  Kill all cells who don't have enough resources to live
  */
  cellDeath() {
    let MIN_WATER = 0.1 * Automata.MATERIAL_WATER_WATER_MEAN;
    let MIN_GLUCOSE = 0.001;
    let toKill = [];
    for (var i = 0; i < this.plant.length; ++i) {
      var cell = this.plant[i];
      if (!cell.fluids) continue;
      if (cell.fluids.vector[Fluids.GLUCOSE] < MIN_GLUCOSE ||
        cell.fluids.vector[Fluids.WATER] < MIN_WATER) {
  // kill cell
  toKill.push(cell);
  }
  if (cell.fluids.vector[Fluids.GLUCOSE] < MIN_GLUCOSE) {
  // console.log('cell killed due to lack of glucose');
  }
  if (cell.fluids.vector[Fluids.WATER] < MIN_WATER) {
  // console.log('cell killed due to lack of water');
  }

  }

  for (var i = 0; i < toKill.length; ++i) {
    var cell: Cell = toKill[i];
  // console.log('Killing cell at: ', cell.row, cell.col);
  var index = this.plant.indexOf(cell);
  this.plant.splice(index, 1);
  // this.fluidsArray[cell.row][cell.col] = cell.fluids;
  this.cellArray[cell.row][cell.col] = undefined;
  }
  }

  subtractFluids(a, b){
    for (var i = 0; i < a.vector.length; i ++){
      a.vector[i] -= b.vector[i];
    }
  }

  splitFluids(fluids){
    let newFluids = new Fluids();
    for (var i = 0; i < fluids.vector.length; i ++){
      fluids.vector[i] /= 2;
      newFluids.vector[i] = fluids.vector[i];
    }
    return newFluids;
  }

  signalsUpdate() {
    // Update each cell's individual signal levels

    for (var i = 0; i < this.plant.length; ++i) {
      var cell = this.plant[i];
      cell.updateSignals();
    }

    // Send signals to neighbors
    let SPREAD_COEFF = 0.1;
    for (var i = 0; i < this.plant.length; i++) {
      var cell = this.plant[i];
      var neighbs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
      for (var j = 0; j < neighbs.length; j++) {
        var nrow = cell.col + neighbs[j][0];
        var ncol = cell.row + neighbs[j][1];
        if (ncol < 0 || nrow < 0 || ncol >= Automata.GRID_N_COLUMNS || nrow >= Automata.GRID_N_ROWS)
          continue;
        var neighbFluids = this.fluidsArray[nrow][ncol];
        if (neighbFluids instanceof Cell) {
          var nsignals = neighbFluids.vector;
          for (var k = Fluids.SIGNALS_START; k < Fluids.N_FLUIDS; k++) {
            if (cell.fluids[k] < nsignals[k])
              continue;
            let amount = SPREAD_COEFF * cell.fluids.vector[k];
            nsignals[k] += amount;
            cell.fluids.vector[k] -= amount;
          }
        }
      }
    }
  }

  doCellMetabolism() {
    // respiration. this is needed for metabolism
    var RESPIRATION_AMOUNT = 0.01;
    for (var i = 0; i < this.plant.length; ++i) {
      var cell = this.plant[i];
      cell.fluids.vector[Fluids.WATER] -= RESPIRATION_AMOUNT;
      cell.fluids.vector[Fluids.GLUCOSE] -= RESPIRATION_AMOUNT;
    }
  }

  doPassiveFlowAndPhotosynthesis() {

    // Initialize fluidsDiff to 0's
    var fluidsDiff = new Array(Automata.GRID_N_ROWS);
    for (var row = 0; row < Automata.GRID_N_ROWS; row++) {
      fluidsDiff[row] = new Array(Automata.GRID_N_COLUMNS);
      for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
        fluidsDiff[row][col] = new Array(Fluids.N_FLUIDS);
        for (var i = 0; i < Fluids.N_FLUIDS; ++i) {
          fluidsDiff[row][col][i] = 0;
        }
      }
    }

    // photosynthesis. TODO this will be an action
    var REACTION_FACTOR = 10; // expend 1 water to get 4 glucose
    for (var i = 0; i < this.plant.length; i++) {
      let cell = this.plant[i];
      if (cell.type.isLeaf) {
        let numAir = this.countAirNeighbors(cell.row, cell.col);
        let dGlucose = Math.min(cell.fluids.vector[Fluids.WATER]/4, 100 * numAir);
        // convert water to glucose
        fluidsDiff[cell.row][cell.col][Fluids.WATER] -= dGlucose;
        fluidsDiff[cell.row][cell.col][Fluids.GLUCOSE] += REACTION_FACTOR*dGlucose;
      }
    }

    // Passive transport / diffusion. Give nutrients to neighbors.
    // console.log(fluidsDiff);
    var neighbs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
    for (var row = 0; row < Automata.GRID_N_ROWS; ++row) {
      for (var col = 0; col < Automata.GRID_N_COLUMNS; ++col) {
        for (var i = 0; i < neighbs.length; ++i) {
          var neighbRow = row + neighbs[i][0];
          var neighbCol = col + neighbs[i][1];
          if (!this.isPositionOnGrid(neighbRow, neighbCol)) {
            continue;
          }

          var flowRate = 0.1;
          // air to air is very fast
          if (this.isAirNotCell(row,col) && this.isAirNotCell(neighbRow,neighbCol)) {
            flowRate = 0.2;
          }

          // disable passive flow from / to cells
          if (this.cellArray[row][col] || this.cellArray[neighbRow][neighbCol]) {
          // flowRate = 0.01
          continue;
          }

          var neighbFluids = this.fluidsArray[neighbRow][neighbCol].vector;
          var fluids = this.fluidsArray[row][col].vector;
          for (var j = 0; j < Fluids.N_FLUIDS; ++j) {
            if (fluids[j] > neighbFluids[j]) {
              var diff = flowRate * (fluids[j] - neighbFluids[j]);
              fluidsDiff[row][col][j] -= diff;
              fluidsDiff[neighbRow][neighbCol][j] += diff;
            }
          }
        }
      }
    }

    // this.validateFluidsArray();

    // Apply fluidsDiff to fluids
    for (var row = 0; row < Automata.GRID_N_ROWS; row ++){
      for (var col = 0; col < Automata.GRID_N_COLUMNS; col ++ ){
        var fluids = this.fluidsArray[row][col].vector;
        var fluidDiff = fluidsDiff[row][col];
        for (var i = 0; i < Fluids.N_FLUIDS; ++i) {
          fluids[i] += fluidDiff[i];
        }
      }
    }
  }

  isPositionOnGrid(row, col) {
    return row >= 0 && col >= 0 &&
    row < Automata.GRID_N_ROWS && col < Automata.GRID_N_COLUMNS;
  }

  isAirNotCell(row, col) {
  // cell is dead and cell is air cell
  if (!this.isPositionOnGrid(row, col)) return false;
  return row < 50 && !this.cellArray[row][col];
  }

  countAirNeighbors(row, col){
    var n = (this.isAirNotCell(row - 1, col)?1:0) +
    (this.isAirNotCell(row + 1, col)?1:0) +
    (this.isAirNotCell(row, col - 1)?1:0) +
    (this.isAirNotCell(row, col + 1)?1:0);
    return n;
  }

  draw() {
    if (this.validateFluidsArray()) {
      console.log('error in fluids, skipping draw');
      return;
    }

    const CHLOROPLAST_COLOR = "#"

    // Background fill color
    let scale = Automata.CELL_SCALE_PIXELS;
    this.canvasCtx.lineWidth = 3;
    // this.canvasCtx.fillStyle = "#7EC0DD"; // sky
    // this.canvasCtx.fillRect(0,0, Automata.GRID_N_COLUMNS * scale, scale * Automata.GRID_N_ROWS)
    // this.canvasCtx.fillRect(0, 0, 100, 100);


    for (var row = 0; row < Automata.GRID_N_ROWS; row ++){
      for (var col = 0; col < Automata.GRID_N_COLUMNS; col ++){
        var fluids = this.fluidsArray[row][col].vector;
        var waterContent = Math.max(0, Math.min(255, Math.round(fluids[Fluids.WATER])));

        if (this.drawStyle === 'water') {
          var waterConcentration = fluids[Fluids.WATER] / (2 * Automata.MATERIAL_DIRT_WATER_MEAN);
          var waterColor = Math.max(Math.min(Math.round(255*waterConcentration),255),0);
          var colorString = "#" + "0064" + hex(waterColor);
          this.canvasCtx.fillStyle = colorString;
        }
        else if(this.drawStyle === 'glucose'){
          if (this.cellArray[row][col]) {
            this.canvasCtx.fillStyle = "#" + hex(Math.min(255,Math.ceil(fluids[Fluids.GLUCOSE]))) + "0000";
          }
          else {
            this.canvasCtx.fillStyle = "#000000";
          }
        }
        else if (this.drawStyle === 'auxin') {
          var cell = this.cellArray[row][col];
          if (cell) {
            this.canvasCtx.fillStyle = "#" + "0000" + hex(Math.min(255,Math.ceil(255*fluids[Fluids.SIGNALS_START])));
          }
          else {
            this.canvasCtx.fillStyle = "#000000";
          }
        }
        else {
          // Default draw style is to show chemicals
          var cell = this.cellArray[row][col];
          if (cell) {
            // this.canvasCtx.fillStyle = cell.type.color;
            const COLOR_WATER = "#0f5e9c";
            const COLOR_CHLOROPLAST = "#25523b";
            this.canvasCtx.fillStyle = interpColors(
              [COLOR_WATER, COLOR_CHLOROPLAST],
              [waterContent/50, cell.getChloroplastLevels()/50]
             )
          }
          else if(row >= 50){
            var cval = Math.ceil(waterContent/4);
            // console.log(waterContent);
            this.canvasCtx.fillStyle = "#3311" + hex(cval);
          }
          else {
            this.canvasCtx.fillStyle = "#7EC0DD";
          }
        }
        this.canvasCtx.fillRect(Math.floor(scale * col), Math.floor(scale * row), scale, scale);

        // draw green outline around the plant
        if (this.drawStyle == 'water' || this.drawStyle == 'glucose' || this.drawStyle == 'auxin') {
          this.canvasCtx.strokeStyle = "#009900";
          var neighbs = [[-1, 0], [1, 0], [0, 1], [0, -1]];

          var cell = this.cellArray[row][col];
          if (cell) {
            for (var i = 0; i < neighbs.length; ++i) {
              var nrow = row + neighbs[i][0];
              var ncol = col + neighbs[i][1];
              if (this.isPositionOnGrid(nrow,ncol) && !this.cellArray[nrow][ncol] ) {
                this.canvasCtx.beginPath();
                if (neighbs[i][0] == -1) {
                  this.canvasCtx.moveTo(scale*col + 0.5, scale*row + 0.5);
                  this.canvasCtx.lineTo(scale*(col+1) + 0.5, scale*row + 0.5);
                } else if (neighbs[i][0] == 1) {
                  this.canvasCtx.moveTo(scale*(col+1) + 0.5, scale*(row+1) + 0.5);
                  this.canvasCtx.lineTo(scale*col + 0.5, scale*(row+1) + 0.5);
                } else if (neighbs[i][1] == -1) {
                  this.canvasCtx.moveTo(scale*col + 0.5, scale*(row+1) + 0.5);
                  this.canvasCtx.lineTo(scale*col + 0.5, scale*row + 0.5);
                } else if (neighbs[i][1] == 1) {
                  this.canvasCtx.moveTo(scale*(col+1) + 0.5, scale*row + 0.5);
                  this.canvasCtx.lineTo(scale*(col+1) + 0.5, scale*(row+1) + 0.5);
                }
                this.canvasCtx.stroke();
              }
            }
          }
        }
      }
    }
  }
}
