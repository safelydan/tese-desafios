import inquirer from "inquirer";

class Vertice {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  getX() {
    return this.#x;
  }
  getY() {
    return this.#y;
  }

  distancia(outroVetor) {
    const distancia1 = outroVetor.getX() - this.#x
    const distancia2 = outroVetor.getY() - this.#y
    const distancia = Math.sqrt(distancia1 ** 2 + distancia2 ** 2)
    return distancia
  }

  move(outroVetor) {
    this.#x = y;
    this.#y = x;
  }

  equals(vetor2) {
    if (this.#x === vetor2.getX() && this.#y === vetor2.getY()) {
      return "sim"
    } else {
      return "não"
    }
  }
}

function criarVertice2() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "x1",
        message: "digite a cordenada x do primeiro vetor: ",
      },
      {
        type: "input",
        name: "y1",
        message: "digite a cordenada y do primeiro vetor: ",
      },
      {
        type: "input",
        name: "x2",
        message: "digite a cordenada x do segundo vetor: ",
      },
      {
        type: "input",
        name: "y2",
        message: "digite a cordenada y do segundo vetor: ",
      },
    ])
    .then((answers) => {
      const vertice1 = new Vertice(Number(answers.x1), Number(answers.y1));
      const vertice2 = new Vertice(Number(answers.x2), Number(answers.y2));

      console.log(`vertice 1
      x: ${vertice1.getX()} 
      y: ${vertice1.getY()}

      vertice 2
      x: ${vertice2.getX()} 
      y: ${vertice2.getY()}`);

      console.log(`são vértices iguais? ${vertice1.equals(vertice2)}`)

      console.log(`distancia entre os vertices: ${vertice1.distancia(vertice2)}`)
    });

}

criarVertice2();

// const vertice1 = new Vertice(1,2)
// const vertice2 = new Vertice(1,3)

// console.log(vertice1.getX(), vertice1.getY())
// console.log(vertice2.getX(), vertice2.getY())
