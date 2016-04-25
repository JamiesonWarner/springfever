
export interface IAction {
}

export class DirectionalAction implements IAction {
    fluidGradient: Array<number>; // morphogen gradient
    gravityGradient: number; // gravitropism
    sunGradient: number; //

    constructor(args){
        this.fluidGradient = args['fluidGradient']
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

