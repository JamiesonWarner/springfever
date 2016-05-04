export class CellTypeSerializer {
    static serialize(celltype: Object): string {
        return "";
    }

    static deserialize(serial: string): Object {
        return {};
    }
}

export class CellType {
    static type_up = 0;
    static type_right = 1;
    static type_rest = 2;
}