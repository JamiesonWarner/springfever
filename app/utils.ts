export class Utils {
  static crossProduct(arr1, arr2) {
    var sum = 0;
    var length = Math.min(arr1.length, arr2.length);
    for (var i = 0; i < length; ++i) {
      sum += arr1[i] * arr2[i];
    }
    return sum;
  }

  static l2norm(arr) {
      var n = 0;
      for (var i = 0; i < arr.length; ++i) {
          n += arr[i] * arr[i];
      }
      return Math.sqrt(n);
  }

  static l1norm(arr) {
    var n = 0;
    for (var i = 0; i < arr.length; ++i) {
      n += arr[i];
    }
    return n;
  }


  static distanceToPlane(fluids, activator) {
    var normW = Utils.l2norm(activator.w);

    var d = 0;
    for (var i = 0; i < length; ++i) {
        d += fluids[i] * activator[i];
    }
    d += activator.b;
    return d / normW;
  }

  /*
  Sigmoid activator.
  Returns value from 0 to 1 given f from -inf to inf.
  */
  static activatorFunction(v) {
      return 1 / (1 + Math.exp(-v));
  }

  static argmax(arr: Array<number>) {
    if (!arr.length)
      return undefined;

    var max = arr[0];
    var argmax = 0;
    for (var i = 1; i < arr.length; ++i) {
      if (arr[i] > max) {
        argmax = i;
        max = arr[i];
      }
    }

    return argmax;
  }
}
