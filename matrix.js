
// var m = new Matrix(3,2);
class Matrix {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = [];

    for (var i = 0; i < this.rows; i++) {
      this.data[i] = [];
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] = 0;
      }
    }
  }

  static fromArray(arr) {
    let m = new Matrix(arr.length, 1);
    for (let i = 0; i < arr.length; i++) {
      m.data[i][0] = arr[i];
    }
    return m;
  }

  toArray() {
    let arr = [];
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  randomize() { //Affects data of matrix
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] += Math.floor(Math.random()*2-1); //Random value between -1 and 1
        }
      }
  }

  add(n) { //Affects data of matrix
    if (n instanceof Matrix) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] += n.data[i][j];
        }
      }
    } else {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] += n;
        }
      }
    }
  }

  transpose() { //Returns new Matrix
    let result = new Matrix(this.cols, this.rows);

    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        result.data[j][i] = this.data[i][j];
      }
    }

    return result;
  }

  static multiply(a, b) {
    //Dot Product
    if (a.cols != b.rows) {
      console.log("Columns of A must match rows of B.");
      return undefined;
    }
    let result = new Matrix (a.rows, b.cols);

    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        // Dot product of values in cols
        let sum = 0;
        for (var k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    return result;

  }

  multiply(n) {
    //Scalar Product
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.data[i][j] *= n;
      }
    }
  }

  map(func) {
    // Apply a funciton to every element of matrix
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        let val = this.data[i][j]
        this.data[i][j] = func(val);
      }
    }
  }

  print() {
    console.table(this.data);
  }




}
