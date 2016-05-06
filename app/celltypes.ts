import {Fluids} from "./fluids";

declare class Network {
    static fromJSON(json: string)
}

export class CellTypeSerializer {
    static serialize(celltype: Object): string {
        var perceptrons = celltype['actionPerceptrons'];
        var perceptronsSerial = new Array(perceptrons.length);
        for (var i = 0; i < perceptrons.length; ++i) {
            perceptronsSerial[i] = perceptrons[i].toJSON();
        }

        return JSON.stringify({
            color: celltype['color'],
            isLeaf: celltype['isLeaf'],
            cost: celltype['cost'].vector,
            actionPerceptrons: perceptronsSerial
        });
    }

    static deserialize(serial: string): Object {
        var obj = JSON.parse(serial);

        var perceptronsSerial = obj.actionPerceptrons;
        var perceptrons = new Array(perceptronsSerial.length);
        for (var i = 0; i < perceptronsSerial.length; ++i) {
            perceptrons[i] = Network.fromJSON(perceptronsSerial[i]);
        }

        obj.actionPerceptrons = perceptrons;
        obj.cost = new (Function.prototype.bind.apply(Fluids, obj.cost));

        return obj;
    }
}

export class CellType {
    static type_up = 0;
    static type_right = 1;
    static type_rest = 2;
}