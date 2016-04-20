/*
Radian-based angles.
*/
export class Angle {
    static RIGHT: number = 0;
    static UP: number = Math.PI / 2;
    static LEFT: number = Math.PI;
    static DOWN: number = 3*Math.PI / 2;

    /*
    Return a random Direction enum based on the angle.
    sampleDirection(0) returns Direction.RIGHT.
    sampleDirection(Math.PI/4) is a 50-50 chance UP or RIGHT.
    */
    static sampleDirection(angle:number) {
        angle = Angle.canonical(angle);
        if (angle == Angle.RIGHT) return Directions.RIGHT;
        if (angle == Angle.UP) return Directions.UP;
        if (angle == Angle.LEFT) return Directions.LEFT;
        if (angle == Angle.DOWN) return Directions.DOWN;

        // d1, d2 specify the quadrant
        var d1, d2;
        if (angle>Angle.RIGHT && angle<Angle.UP) {
            d1 = Directions.RIGHT;
            d2 = Directions.UP;
        }
        else if (angle>Angle.UP && angle<Angle.LEFT) {
            d1 = Directions.UP;
            d2 = Directions.LEFT;
        }
        else if (angle>Angle.LEFT && angle<Angle.DOWN) {
            d1 = Directions.LEFT;
            d2 = Directions.DOWN;
        }
        else {
            d1 = Directions.DOWN;
            d2 = Directions.RIGHT;
        }

        // determine how much the angle is pointing toward d1
        angle = angle % (Math.PI / 2);
        var sin = Math.sin(angle),
            cos = Math.cos(angle);
        if (Math.random() < cos/(sin+cos)) {
            return d1;
        }
        else {
            return d2;
        }
    }

    /* Returns angle between 0 and 2 PI */
    static canonical(angle:number) {
        angle = angle % (2 * Math.PI);
        if (angle < 0) {
            return angle + 2*Math.PI;
        }
        return angle;
    }

    /*
    Computes angle of the given (x,y) vector
    */
    static vectorAngle(x:number, y:number) {
        return Math.atan2(y, x);
    }

    // static gradient()
}

/*
Cardinal direction enums
*/
export class Directions {
    static RIGHT:number = 0;
    static UP:number = 1;
    static LEFT:number = 2;
    static DOWN:number = 3;
}