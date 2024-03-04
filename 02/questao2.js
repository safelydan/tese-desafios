import inquirer from "inquirer";

class Triangulo {
  #x;
  #y;
  #z;

  constructor(x, y, z) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
  }

  getX() {
    return this.#x;
  }
  getY() {
    return this.#y;
  }
  getZ() {
    return this.#z;
  }

  equals(triangulo2) {
    if (
      this.getX() === triangulo2.getX() &&
      this.getY() === triangulo2.getY() &&
      this.getZ() === triangulo2.getZ()
    ) {
      return "sim";
    } else {
      return "nao";
    }
  }

  tipo() {}

  clone() {}
}

function criarTriangulo() {
  inquirer
  .prompt([
    { type: "input", name: "x1", message: "digite o lado x do triângulo 1: " },
    { type: "input", name: "y1", message: "digite o lado y do triângulo 1: " },
    { type: "input", name: "z1", message: "digite o lado z do triângulo 1: " },
    { type: "input", name: "x2", message: "digite o lado x do triângulo 2: " },
    { type: "input", name: "y2", message: "digite o lado y do triângulo 2: " },
    { type: "input", name: "z2", message: "digite o lado z do triângulo 2: " },
    { type: "input", name: "x3", message: "digite o lado x do triângulo 3: " },
    { type: "input", name: "y3", message: "digite o lado y do triângulo 3: " },
    { type: "input", name: "z3", message: "digite o lado z do triângulo 3: " },
  ])
    .then((answers) => {
      const triangulo1 = new Triangulo(
        Number(answers.x1),
        Number(answers.y1),
        Number(answers.z1)
      );
      const triangulo2 = new Triangulo(
        Number(answers.x2),
        Number(answers.y2),
        Number(answers.z2)
      );
      const triangulo3 = new Triangulo(
        Number(answers.x3),
        Number(answers.y3),
        Number(answers.z3)
      );
      console.log(`triângulo 1 
      x: ${triangulo1.getX()} y: ${triangulo1.getY()} z: ${triangulo1.getZ()}`);
      console.log(`triângulo 2 
      x: ${triangulo2.getX()} y: ${triangulo2.getY()} z: ${triangulo2.getZ()}`);
      console.log(`triângulo 3 
      x: ${triangulo3.getX()} y: ${triangulo3.getY()} z: ${triangulo3.getZ()}`);
      console.log(`os triângulos são iguais? ${triangulo1.equals(triangulo2)}`);
    });
}

criarTriangulo();
