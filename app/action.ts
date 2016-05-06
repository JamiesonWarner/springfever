import {Angle} from "./angle";
import {Utils} from "./utils";

export interface IAction {
    /*
    Modify the parameters of the action by a given amount
    */
    mutate(amount: number);
}

export class ActionSerializer {
    static serialize(action: IAction): string {
        var cls;
        if (action.constructor == DivideAction) {
            cls = "DivideAction";
        }
        else if (action.constructor == PumpAction) {
            cls = "PumpAction";
        }
        else if (action.constructor == ReactAction) {
            cls = "ReactAction";
        }
        else if (action.constructor == SpecializeAction) {
            cls = "SpecializeAction";
        }
        else {
            throw new TypeError("Did not recognize the specified action type");
        }

        var obj = {
            class: cls
        };
        if (action instanceof DirectionalAction) {
            obj['fluidGradient'] = action.fluidGradient;
            obj['gravityGradient'] = action.gravityGradient;
            obj['sunGradient'] = action.sunGradient;
        }
        else if (action instanceof ReactAction) {
            obj['reaction'] = action.reaction;
        }
        else if (action instanceof SpecializeAction) {
            obj['toType'] = action.toType;
        }
        else if (action instanceof PumpAction) {
            obj['fluids'] = action.fluids;
        }
        return JSON.stringify(obj)
    }

    static deserialize(jsonAction: string): IAction {
        var obj = JSON.parse(jsonAction);
        switch (obj.class) {
            case "DivideAction":
                return new DivideAction(obj);
            case "PumpAction":
                return new PumpAction(obj);
            case "ReactAction":
                return new ReactAction(obj);
            case "SpecializeAction":
                return new SpecializeAction(obj);
            default:
                throw new TypeError("Bad jsonAction");
        }
    }
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

        return direction;
    }

    /*
    Calculate the angle that this action points to
    */
    getGradientToFluids() {

    }

    mutate(amount: number = 1) {
        for (var i = 0; i < this.fluidGradient.length; ++i) {
            var r = Utils.getBoundedRandom(amount);
            this.fluidGradient[i] += r;
        }
        if (typeof this.gravityGradient != 'undefined')
            this.gravityGradient += Utils.getBoundedRandom(amount);
        if (typeof this.sunGradient != 'undefined')
            this.sunGradient += Utils.getBoundedRandom(amount);
    }
}

export class DivideAction extends DirectionalAction {
    constructor(args){
        super(args);
    }
}

export class PumpAction extends DirectionalAction {
    fluids: Array<number>;

    constructor(args){
        super(args);
        this.fluids = args['fluids'] || [];
    }

    mutate(amount: number = 1) {
        super.mutate(amount);
        for (var i = 0; i < this.fluids.length; ++i) {
            var r = Utils.getBoundedRandom(amount);
            this.fluids[i] += r;
        }
    }
}

export class ReactAction implements IAction {
    reaction: Array<number>; // fluid vec

    constructor(args){
        this.reaction = args['reaction'];
    }

    // mutating a react action should not change the reagents / products
    mutate(amount: number = 1) {}
}

export class SpecializeAction implements IAction {
    toType: number;

    constructor(args){
        this.toType = args['toType'];
    }

    mutate(amount: number = 1) {

    }
}

