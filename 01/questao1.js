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

  distancia(vertice2) {
    const distancia1 = this.#x - vertice2.getX();
    const distancia2 = this.#y - vertice2.getY();
    return Math.sqrt(distancia1 ** 2 + distancia2 ** 2);
  }

  
  move(novoX, novoY) {
    this.#x = novoX;
    this.#y = novoY;
  }

  
  equals(vertice2, vertice3) {
    if (this.#x === vertice2.getX() && this.#x === vertice3.getX() && this.#y === vertice2.getY() && this.#y === vertice3.getY()) {
      return "Sim";
    } else {
      return "Não";
    }
  }
}

function criarVertice() {
  inquirer
    .prompt([
      { type: "input", name: "x1", message: "Digite a coordenada x do primeiro vértice: " },
      { type: "input", name: "y1", message: "Digite a coordenada y do primeiro vértice: " },
      { type: "input", name: "x2", message: "Digite a coordenada x do segundo vértice: " },
      { type: "input", name: "y2", message: "Digite a coordenada y do segundo vértice: " },
      { type: "input", name: "x3", message: "Digite a coordenada x do terceiro vértice: " },
      { type: "input", name: "y3", message: "Digite a coordenada y do terceiro vértice: " },
    ])
    .then((answers) => {
      const primeiroVertice = new Vertice(Number(answers.x1), Number(answers.y1));
      const segundoVertice = new Vertice(Number(answers.x2), Number(answers.y2));
      const terceiroVertice = new Vertice(Number(answers.x3), Number(answers.y3));
      const distanciaEntreVertices = primeiroVertice.distancia(segundoVertice, terceiroVertice);

      console.log(`Primeiro vértice criado: x: ${primeiroVertice.getX()} y: ${primeiroVertice.getY()}`);
      console.log(`Segundo vértice criado: x: ${segundoVertice.getX()} y: ${segundoVertice.getY()}`);
      console.log(`Terceiro vértice criado: x: ${terceiroVertice.getX()} y: ${terceiroVertice.getY()}`);
      console.log(`Distância entre os vértices: ${distanciaEntreVertices}`);
      console.log(`São vértices iguais? ${primeiroVertice.equals(segundoVertice, terceiroVertice)}.`);
    });
}

// chama a função para criar vértices com base nas entradas do usuário
if (import.meta.url === `file://${process.argv[1]}`) {
  criarVertice();
}

export default Vertice;