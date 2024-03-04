import inquirer from "inquirer";

class Vertice {
  #x; // atributo privado para armazenar a coordenada x
  #y; // atributo privado para armazenar a coordenada y

  // construtor da classe, inicializa os valores de x e y ao criar um objeto Vertice
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  // método getter para obter a coordenada x
  getX() {
    return this.#x;
  }

  // método getter para obter a coordenada y
  getY() {
    return this.#y;
  }

  // método para calcular a distância euclidiana entre dois vértices
  distancia(vertice2, vertice3) {
    const distX2 = this.#x - vertice2.getX();
    const distY2 = this.#y - vertice2.getY();
    const distX3 = this.#x - vertice3.getX();
    const distY3 = this.#y - vertice3.getY();
    return Math.sqrt(distX2 ** 2 + distY2 ** 2 + distX3 ** 2 + distY3 ** 2);
  }

  // método para mover o vértice para novas coordenadas
  move(novoX, novoY) {
    this.#x = novoX;
    this.#y = novoY;
  }

  // método para verificar se dois vértices são iguais
  equals(vertice2, vertice3) {
    if (this.#x === vertice2.getX() && this.#x === vertice3.getX() && this.#y === vertice2.getY() && this.#y === vertice3.getY()) {
      return "sim";
    } else {
      return "nao";
    }
  }
}

// função para criar vértices com base nas entradas do usuário
function criarVertice() {
  inquirer
    .prompt([
      { type: "input", name: "x1", message: "digite a coordenada x do primeiro vértice: " },
      { type: "input", name: "y1", message: "digite a coordenada y do primeiro vértice: " },
      { type: "input", name: "x2", message: "digite a coordenada x do segundo vértice: " },
      { type: "input", name: "y2", message: "digite a coordenada y do segundo vértice: " },
      { type: "input", name: "x3", message: "digite a coordenada x do terceiro vértice: " },
      { type: "input", name: "y3", message: "digite a coordenada y do terceiro vértice: " },
    ])
    .then((answers) => {
      // cria instâncias da classe Vertice com base nas respostas do usuário
      const primeiroVertice = new Vertice(Number(answers.x1), Number(answers.y1));
      const segundoVertice = new Vertice(Number(answers.x2), Number(answers.y2));
      const terceiroVertice = new Vertice(Number(answers.x3), Number(answers.y3));
      const distanciaEntreVertices = primeiroVertice.distancia(segundoVertice, terceiroVertice);

      // imprime as informações sobre os vértices e a distância entre eles
      console.log(`primeiro vértice criado: x: ${primeiroVertice.getX()} y: ${primeiroVertice.getY()}`);
      console.log(`segundo vértice criado: x: ${segundoVertice.getX()} y: ${segundoVertice.getY()}`);
      console.log(`terceiro vértice criado: x: ${terceiroVertice.getX()} y: ${terceiroVertice.getY()}`);
      console.log(`distância entre os vértices: ${distanciaEntreVertices}`);
      console.log(`são vértices iguais? ${primeiroVertice.equals(segundoVertice, terceiroVertice)}.`);
    });
}

// chama a função para criar vértices com base nas entradas do usuário
criarVertice();
