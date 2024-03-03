import inquirer from "inquirer";

// definição da classe Vertice
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

  move(novoX, novoY) {
    this.#x = novoX;
    this.#y = novoY;
  }

  equals(vertice2) {
    if (this.#x === vertice2.#x && this.#y === vertice2.#y) {
      return "sim";
    } else {
      return "nao";
    }
  }
}

function criarVertice() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "x1",
        message: "Digite a cornenada x do primeiro vértice: ",
      },
      {
        type: "input",
        name: "y1",
        message: "Digite a cornenada y do primeiro vértice: ",
      },
      {
        type: "input",
        name: "x2",
        message: "Digite a cornenada x do segundo vértice: ",
      },
      {
        type: "input",
        name: "y2",
        message: "Digite a cornenada y do segundo vétice: ",
      },
    ])
    .then((answers) => {
      const primeiroVertice = new Vertice(
        Number(answers.x1),
        Number(answers.y1)
      );
      const segundoVertice = new Vertice(
        Number(answers.x2),
        Number(answers.y2)
      );
      const distanceEntreVertices = primeiroVertice.distancia(segundoVertice);

      //primeiroVertice.move(4, 40)

      console.log(`Vertice1 criado: 
        x: ${primeiroVertice.getX()} y: ${primeiroVertice.getY()}`);
      console.log(`Vertice2 criado: 
        x: ${segundoVertice.getX()} y: ${segundoVertice.getY()}`);
      console.log(`Distancia entre os vertices: ${distanceEntreVertices}`);
      console.log(
        `São vertices iguais? ${primeiroVertice.equals(segundoVertice)}.`
      );
    });
}

criarVertice();
