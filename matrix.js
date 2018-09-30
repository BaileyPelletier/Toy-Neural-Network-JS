
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

  static fromArray(arr) { // returns a matrix object
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

  static subtract (a,b) { // returns a matrix object
    // Return a new Matrix a-b
    let result = new Matrix(a.rows, a.cols);
    for (var i = 0; i < result.rows; i++) {
      for (var j = 0; j < result.cols; j++) {
        result.data[i][j] = a.data[i][j] - b.data[i][j];
      }
    }
    return result;
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

  static transpose(matrix) { //Returns new Matrix
    let result = new Matrix(matrix.cols, matrix.rows);

    for (var i = 0; i < matrix.rows; i++) {
      for (var j = 0; j < matrix.cols; j++) {
        result.data[j][i] = matrix.data[i][j];
      }
    }

    return result;
  }

  static multiply(a, b) { // returns a matrix object
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
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }

      // Hadamard Product
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] *= n.data[i][j];
        }
      }
    } else {
      // Scalar product
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.cols; j++) {
          this.data[i][j] *= n;
        }
      }
    }


    // if (n instanceof Matrix) {
    //   if (this.rows !== n.rows || this.cols !== n.cols) {
    //     console.log('Columns and Rows of A must match Columns and Rows of B.');
    //     return;
    //   }
    // }
    //
    // //Scalar Product
    // for (var i = 0; i < this.rows; i++) {
    //   for (var j = 0; j < this.cols; j++) {
    //     this.data[i][j] *= n;
    //   }
    // }
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

  static map(matrix, func) { //returns a matrix object
    let result = new Matrix(matrix.rows, matrix.cols);
    // Apply a funciton to every element of matrix
    for (var i = 0; i < matrix.rows; i++) {
      for (var j = 0; j < matrix.cols; j++) {
        let val = matrix.data[i][j]
        result.data[i][j] = func(val);
      }
    }

    return result;
  }

  print() {
    console.table(this.data);
  }




}
