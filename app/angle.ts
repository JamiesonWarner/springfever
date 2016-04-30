/*
Radian-based angles.
*/
export class Angle {
    static RIGHT: number = 0;
    static UP: number = Math.PI / 2;
    static LEFT: number = Math.PI;
    static DOWN: number = 3*Math.PI / 2;

    static directionDeltaRow(direction: Direction) {
        if (direction == Direction.up) {
            return -1;
        }
        else if (direction == Direction.down) {
            return 1;
        }
        return 0;
    }
    static directionDeltaCol(direction: Direction) {
        if (direction == Direction.left) {
            return -1;
        }
        else if (direction == Direction.right) {
            return 1;
        }
        return 0;
    }

    /*
    Return a random Direction enum based on the angle.
    sampleDirection(0) returns Direction.RIGHT.
    sampleDirection(Math.PI/4) is a 50-50 chance UP or RIGHT.
    */
    static sampleDirection(angle:number) {
        angle = Angle.canonical(angle);
        if (angle == Angle.RIGHT) return Direction.right;
        if (angle == Angle.UP) return Direction.up;
        if (angle == Angle.LEFT) return Direction.left;
        if (angle == Angle.DOWN) return Direction.down;

        // d1, d2 specify the quadrant
        var d1, d2;
        if (angle>Angle.RIGHT && angle<Angle.UP) {
            d1 = Direction.right;
            d2 = Direction.up;
        }
        else if (angle>Angle.UP && angle<Angle.LEFT) {
            d1 = Direction.up;
            d2 = Direction.left;
        }
        else if (angle>Angle.LEFT && angle<Angle.DOWN) {
            d1 = Direction.left;
            d2 = Direction.down;
        }
        else {
            d1 = Direction.down;
            d2 = Direction.right;
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

enum Direction {
    right,
    up,
    left,
    down
}
