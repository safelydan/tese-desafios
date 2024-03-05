import inquirer from "inquirer";
import Vertice from "../01/questao1.js"

class Triangulo {
  #verticeX;
  #verticeY;
  #verticeZ;

  constructor(verticeX, verticeY, verticeZ) {
    if (!(verticeX instanceof Vertice) || !(verticeY instanceof Vertice) || !(verticeZ instanceof Vertice)) {
      throw new Error("Os parâmetros devem ser instâncias da classe Vertice.");
    }

    const ladoX = verticeX.distancia(verticeY)
    const ladoY = verticeX.distancia(verticeZ)
    const ladoZ = verticeY.distancia(verticeZ)

    if(ladoX + ladoY > ladoZ && ladoX + ladoZ > ladoY && ladoY + ladoZ > ladoX){
      return `eh um triangulo`
    }if (!(ladoX + ladoY > ladoZ && ladoX + ladoZ > ladoY && ladoY + ladoZ > ladoX)) {
      throw new Error("nao eh um triangulo válido.");}

    this.#verticeX = verticeX;
    this.#verticeY = verticeY;
    this.#verticeZ = verticeZ;
    
  }

  getVerticeX() {
    return this.#verticeX;
  }
  getVerticeY() {
    return this.#verticeY;
  }
  getVerticeZ() {
    return this.#verticeZ;
  }

  verificaTriangulo(verticeX, verticeY, verticeZ){

  }

  equals(triangulo2, triangulo3) {
    if (
      this.getVerticeX() === triangulo2.getVerticeX() &&
      this.getVerticeY() === triangulo2.getVerticeY() &&
      this.getVerticeZ() === triangulo2.getVerticeZ() && 
      this.getVerticeX() === triangulo3.getVerticeX() &&
      this.getVerticeY() === triangulo3.getVerticeY() &&
      this.getVerticeZ() === triangulo3.getVerticeZ() 
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
      x: ${triangulo1.getVerticeX()} y: ${triangulo1.getVerticeY()} z: ${triangulo1.getVerticeZ()}`);
      console.log(`triângulo 2 
      x: ${triangulo2.getVerticeX()} y: ${triangulo2.getVerticeY()} z: ${triangulo2.getVerticeZ()}`);
      console.log(`triângulo 3 
      x: ${triangulo3.getVerticeX()} y: ${triangulo3.getVerticeY()} z: ${triangulo3.getVerticeZ()}`);

      console.log(`é um triangulo? ${verificaTriangulo}` `os triângulos são iguais? ${triangulo1.equals(triangulo2, triangulo3)}`);
    });
}

criarTriangulo();
