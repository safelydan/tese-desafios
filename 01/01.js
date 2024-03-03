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
  distancia(vertice2) {
    const distX = this.#x - vertice2.getX();
    const distY = this.#y - vertice2.getY();
    return Math.sqrt(distX ** 2 + distY ** 2);
  }

  // método para mover o vértice para novas coordenadas
  move(novoX, novoY) {
    this.#x = novoX;
    this.#y = novoY;
  }

  // método para verificar se dois vértices são iguais
  equals(vertice2) {
    if (this.#x === vertice2.#x && this.#y === vertice2.#y) {
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
      {
        type: "input",
        name: "x1",
        message: "digite a coordenada x do primeiro vértice: ",
      },
      {
        type: "input",
        name: "y1",
        message: "digite a coordenada y do primeiro vértice: ",
      },
      {
        type: "input",
        name: "x2",
        message: "digite a coordenada x do segundo vértice: ",
      },
      {
        type: "input",
        name: "y2",
        message: "digite a coordenada y do segundo vértice: ",
      },
    ])
    .then((answers) => {
      // cria instâncias da classe Vertice com base nas respostas do usuário
      const primeiroVertice = new Vertice(
        Number(answers.x1),
        Number(answers.y1)
      );
      const segundoVertice = new Vertice(
        Number(answers.x2),
        Number(answers.y2)
      );
      const distanciaEntreVertices = primeiroVertice.distancia(segundoVertice);

      console.log(`vertice1 criado: 
        x: ${primeiroVertice.getX()} y: ${primeiroVertice.getY()}`);
      console.log(`vertice2 criado: 
        x: ${segundoVertice.getX()} y: ${segundoVertice.getY()}`);
      console.log(`distancia entre os vertices: ${distanciaEntreVertices}`);
      console.log(
        `são vertices iguais? ${primeiroVertice.equals(segundoVertice)}.`
      );
    });
}

// chama a função para criar vértices com base nas entradas do usuário
criarVertice();
