
var N_SIGNALS = 4;

export class Signals {
    vector;
    constructor() {
        this.vector = new Array(N_SIGNALS);
        for (var i = 0; i < N_SIGNALS; ++i) {
            this.vector[i] = 0;
        }
    }
}
