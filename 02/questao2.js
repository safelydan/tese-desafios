import inquirer from "inquirer";
// import Vertice from "../01/questao1.js"

class Triangulo {
  #verticeX;
  #verticeY;
  #verticeZ;

  constructor(verticeX, verticeY, verticeZ) {
    this.#verticeX = verticeX;
    this.#verticeY = verticeY;
    this.#verticeZ = verticeZ;
  }

  getX() {
    return this.#verticeX;
  }
  getY() {
    return this.#verticeY;
  }
  getZ() {
    return this.#verticeZ;
  }

  verificaTriangulo(vertice1, vertice2, vertice3){
    const ladoX = vertice1.distancia(vertice2)
    const ladoY = vertice1.distancia(vertice3)
    const ladoZ = vertice2.distancia(vertice3)

    if(ladoX + ladoY > ladoZ && ladoX + ladoZ > ladoY && ladoY + ladoZ > ladoX){
      console.log(`eh um triangulo`)
    }
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
    { type: "input", name: "verticeX1", message: "digite o lado x do triângulo 1: " },
    { type: "input", name: "verticeY1", message: "digite o lado y do triângulo 1: " },
    { type: "input", name: "verticeZ1", message: "digite o lado z do triângulo 1: " },
    { type: "input", name: "verticeX2", message: "digite o lado x do triângulo 2: " },
    { type: "input", name: "verticeY2", message: "digite o lado y do triângulo 2: " },
    { type: "input", name: "verticeZ2", message: "digite o lado z do triângulo 2: " },
    { type: "input", name: "verticeX3", message: "digite o lado x do triângulo 3: " },
    { type: "input", name: "verticeY3", message: "digite o lado y do triângulo 3: " },
    { type: "input", name: "verticeZ3", message: "digite o lado z do triângulo 3: " },
  ])
    .then((answers) => {
      const triangulo1 = new Triangulo(
        Number(answers.verticeX1),
        Number(answers.verticeY1),
        Number(answers.verticeZ1)
      );
      const triangulo2 = new Triangulo(
        Number(answers.verticeX2),
        Number(answers.verticeY2),
        Number(answers.verticeZ2)
      );
      const triangulo3 = new Triangulo(
        Number(answers.verticeX3),
        Number(answers.verticeY3),
        Number(answers.verticeZ3)
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
