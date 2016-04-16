
var N_SIGNALS = 4;

export class Signals {
    vector;
    constructor(start) {
        this.vector = new Array(N_SIGNALS);
        if (start) {
            for (var i = 0; i < N_SIGNALS; i++) {
                this.vector[i] = start[i];
            }
        }
        else {
            for (var i = 0; i < N_SIGNALS; i++) {
                this.vector[i] = 0;
            }
        }
    }
}
