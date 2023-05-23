const shape = {
  I: [
    [
      [0, 1],
      [-1, 1],
      [1, 1],
      [-2, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [-1, 0],
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, -1],
      [0, 0],
      [0, 1],
      [0, 2],
    ],
  ],
  L: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
  ],
  J: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [-1, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
    ],
  ],
  O: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ],
  Z: [
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 0],
    ],
  ],
  S: [
    [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 1],
      [0, 2],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
  ],
  T: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 1],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 0],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
  ],
};

const shape_list = ["I","L","J","O","Z","S","T"];
const color_list = [
  "aqua",
  "blue",
  "orange",
  "yellow",
  "green",
  "purple",
  "red",
];

let move = true;
let rotate = true;

class Tetris {
  constructor(ctx, height, width, size) {
    this.ctx = ctx;
    this.height = height;
    this.width = width;
    this.size = size;

    this.shape;
    this.color;
    this.index = 0;
    this.flag = true;
    this.ingrained = [];
    this.left = true;
    this.right = true;
  }

  shape_create() {
    if (this.shape != undefined) {
      this.ingrained.push(this.shape[this.index], this.color);
    }

    const random_index = Math.floor(Math.random() * shape_list.length);

    this.shape = structuredClone(shape[shape_list[random_index]]);

    this.color = color_list[random_index];
  }

  shape_draw() {
    let x,
      y = 0;

    for (let i = 0; i < this.shape[this.index].length; i++) {
      x = (this.shape[this.index][i][0] + 4) * this.size;
      y = this.shape[this.index][i][1] * this.size;

      this.ctx.fillStyle = this.color;
      this.ctx.fillRect(x, y, this.size, this.size);
    }

    for (let element = 0; element < this.ingrained.length; element += 2) {
      for (let i = 0; i < this.ingrained[element].length; i++) {
        x = (this.ingrained[element][i][0] + 4) * this.size;
        y = this.ingrained[element][i][1] * this.size;

        this.ctx.fillStyle = this.ingrained[element + 1];
        this.ctx.fillRect(x, y, this.size, this.size);
      }
    }
  }

  shape_bottom() {
    let y;

    for (let i = 0; i < this.shape[this.index].length; i++) {
      y = this.shape[this.index][i][1];

      if (y == 19) {
        this.flag = true;
      }
    }
  }

  shape_stack() {
    let x, y;

    for (let i = 0; i < this.shape[this.index].length; i++) {
      for (let element = 0; element < this.ingrained.length; element += 2) {
        for (let k = 0; k < this.ingrained[element].length; k++) {
          x = this.ingrained[element][k][0];
          y = this.ingrained[element][k][1];

          if (
            x == this.shape[this.index][i][0] &&
            y == this.shape[this.index][i][1] + 1
          ) {
            this.flag = true;
          }
        }
      }
    }
  }

  shape_push() {
    for (let element = 0; element < this.shape.length; element++) {
      for (let i = 0; i < this.shape[element].length; i++) {
        this.shape[element][i][1] += 1;
      }
    }
  }

  shape_move(tetris) {
    document.addEventListener("keydown", function (event) {
      let left = true;
      let right = true;

      if (event.keyCode == 65 || event.keyCode == 68) {
        for (
          let element = 0;
          element < tetris.shape[tetris.index].length;
          element++
        ) {
          if (tetris.shape[tetris.index][element][0] < -3) {
            left = false;
          }

          if (tetris.shape[tetris.index][element][0] > 4) {
            right = false;
          }
        }
      }

      for (let element = 0; element < tetris.shape.length; element++) {
        for (let i = 0; i < tetris.shape[element].length; i++) {
          if (event.keyCode == 65 && move && left && tetris.left) {
            tetris.shape[element][i][0] -= 1;
          }
          if (event.keyCode == 68 && move && right && tetris.right) {
            tetris.shape[element][i][0] += 1;
          }
        }
      }
      move = false;
    });

    document.addEventListener("keyup", function (event) {
      if (event.keyCode == 65) {
        move = true;
      }

      if (event.keyCode == 68) {
        move = true;
      }
    });
  }

  shape_rotation(tetris) {
    document.addEventListener("keydown", function (event) {

      let control = true;
      let x,y;
      // WALL KICK

      for (let element = 0; element < tetris.shape.length; element++) {
        for (let i = 0; i < tetris.shape[element].length; i++) {
          if (
            tetris.shape[element][i][0] < -3 ||
            tetris.shape[element][i][0] > 4
          ) {
            control = false;
          }
        }
      }

      // SHAPE KICK

      for (let index = 0; index < tetris.shape.length; index++) {
        for (let shp = 0; shp < tetris.shape[index].length; shp++) {
          for (
            let element = 0;
            element < tetris.ingrained.length;
            element += 2
          ) {
            for (let i = 0; i < tetris.ingrained[element].length; i++) {
              x = tetris.ingrained[element][i][0];
              y = tetris.ingrained[element][i][1];

              if (x == tetris.shape[index][shp][0] == x && y == tetris.shape[index][shp][1]) {
                control = false;
              }
            }
          }
        }
      }

      console.log(control);
      if (event.keyCode == 87 && rotate && control) {
        if (tetris.index < 3) {
          tetris.index += 1;
        } else {
          tetris.index = 0;
        }
      }

      rotate = false;
    });

    document.addEventListener("keyup", function (event) {
      if (event.keyCode == 87) {
        rotate = true;
      }
    });
  }

  score() {
    let y;

    for (let i = 0; i <= 20; i++) {
      let count = 0;
      for (let element = 0; element < this.ingrained.length; element += 2) {
        for (let k = 0; k < this.ingrained[element].length; k++) {
          y = this.ingrained[element][k][1];

          if (y == i) {
            count += 1;
          }
        }
      }

      if (count == 10) {
        for (let _ = 0; _ < 3; _++) {
          for (let element = 0; element < this.ingrained.length; element += 2) {
            for (let k = 0; k < this.ingrained[element].length; k++) {
              y = this.ingrained[element][k][1];
              if (y == i) {
                this.ingrained[element].splice(k, 1);
              }
            }
          }
        }

        for (let element = 0; element < this.ingrained.length; element += 2) {
          for (let k = 0; k < this.ingrained[element].length; k++) {
            y = this.ingrained[element][k][1];
            if (y != 19 && y < i) {
              this.ingrained[element][k][1] += 1;
            }
          }
        }
      }
    }
  }

  shape_control() {
    let x, y;
    this.left = true;
    this.right = true;

    for (let shp = 0; shp < this.shape[this.index].length; shp++) {
      for (let element = 0; element < this.ingrained.length; element += 2) {
        for (let i = 0; i < this.ingrained[element].length; i++) {
          x = this.ingrained[element][i][0];
          y = this.ingrained[element][i][1];
          if (y == this.shape[this.index][shp][1]) {
            if (x == this.shape[this.index][shp][0] + 1) {
              this.right = false;
            }
            if (x == this.shape[this.index][shp][0] - 1) {
              this.left = false;
            }
          }
        }
      }
    }
  }

  update() {
    if (!this.flag) {
      this.shape_stack();
    }

    if (this.flag) {
      this.shape_create();
      this.flag = false;
    }

    this.shape_draw();
    this.shape_bottom();
    this.score();
    this.shape_control();
  }
}

export default Tetris;
