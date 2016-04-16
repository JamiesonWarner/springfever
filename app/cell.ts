export class Cell {
    fluids;
    x;
    y;
    type;
    dna;

    constructor(x,y,fluids,type, dna) {
        this.x = x;
        this.y = y;
        this.fluids = fluids;
        this.type = type;
        this.dna = dna;
    }

    update() {
    }

    /*
    returns -
        {
            type: 'grow'
            parameters: {
                'up', 'right', 'down', 'left'
            }
        }

    */
    getAction() {

        // if (Math.random() > 0.5) {
        //     return {
        //         name: 'grow',
        //         parameters: {
        //             direction: 'up',
        //             type: 'a1'
        //         }
        //     }
        // }
        // else if (Math.random() > 0.5) {
        //     return {
        //         name: 'grow',
        //         parameters: {
        //             direction: 'right',
        //             type: 'a2'
        //         }
        //     }
        // }
        // return {
        //     name: 'grow',
        //     parameters: {
        //         direction: 'left',
        //         type: 'a2'
        //     }
        // }

        return this.dna.chooseAction(this.fluids, this.type);
    }
}
