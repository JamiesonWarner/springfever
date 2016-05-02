import {Angle} from "./angle";
import {Utils} from "./utils";

export interface IAction {
}

export class DirectionalAction implements IAction {
    fluidGradient: Array<number>; // morphogen gradient
    gravityGradient: number; // gravitropism
    sunGradient: number; //

    constructor(args){
        this.fluidGradient = args['fluidGradient'];
        this.gravityGradient = args['gravityGradient'];
        this.sunGradient = args['sunGradient'];
    }

    getActionDirection(upFluids, rightFluids, downFluids, leftFluids): number {
        var upContribution = Utils.crossProduct(upFluids, this.fluidGradient);
        var rightContribution = Utils.crossProduct(rightFluids, this.fluidGradient);
        var downContribution = Utils.crossProduct(downFluids, this.fluidGradient);
        var leftContribution = Utils.crossProduct(leftFluids, this.fluidGradient);

        if (this.gravityGradient) {
            downContribution += this.gravityGradient;
        }

        var direction = Math.atan2(upContribution - downContribution, rightContribution - leftContribution);
        console.log('calculated action direction is ', direction, upContribution, downContribution);

        return direction;
    }

    /*
    Calculate the angle that this action points to
    */
    getGradientToFluids() {

    }
}

export class DivideAction extends DirectionalAction {
    constructor(args){
        super(args);
    }
}

export class PumpAction extends DirectionalAction {
    constructor(args){
        super(args);
    }
}

export class ReactAction implements IAction {
    reaction: Array<number>; // fluid vec

    constructor(args){
        this.reaction = args['reaction'];
    }
}

export class SpecializeAction implements IAction {
    toType: number;

    constructor(args){
        this.toType = args['toType'];
    }
}

