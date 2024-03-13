// importa a biblioteca 'inquirer' para lidar com a entrada do usuário
import inquirer from "inquirer";

// define uma classe chamada 'Vertice' para representar um ponto 2D com coordenadas x e y
class Vertice {
  #x; // campo privado para a coordenada x
  #y; // campo privado para a coordenada y

  // construtor para inicializar o objeto Vertice com coordenadas x e y
  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }
  
  // método getter para a coordenada x
  getX() {
    return this.#x;
  }

  // método getter para a coordenada y
  getY() {
    return this.#y;
  }

  // método para calcular a distância entre dois vértices
  distancia(vertice2) {
    const distancia1 = this.#x - vertice2.getX();
    const distancia2 = this.#y - vertice2.getY();
    return Math.sqrt(distancia1 ** 2 + distancia2 ** 2);
  }

  // método para mover o vértice para uma nova posição
  move(novoX, novoY) {
    this.#x = novoX;
    this.#y = novoY;
  }

  // método para verificar se dois vértices são iguais
  equals(vertice2, vertice3) {
    if (this.#x === vertice2.getX() && this.#x === vertice3.getX() && this.#y === vertice2.getY() && this.#y === vertice3.getY()) {
      return "sim"; // "sim" se os vértices forem iguais
    } else {
      return "não"; // "não" se os vértices não forem iguais
    }
  }
}

// função para criar vértices com base na entrada do usuário usando prompts 'inquirer'
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
      // cria objetos Vertice com coordenadas fornecidas pelo usuário
      const primeiroVertice = new Vertice(Number(answers.x1), Number(answers.y1));
      const segundoVertice = new Vertice(Number(answers.x2), Number(answers.y2));
      const terceiroVertice = new Vertice(Number(answers.x3), Number(answers.y3));
      
      // calcula e exibe a distância entre os vértices
      const distanciaEntreVertices = primeiroVertice.distancia(segundoVertice, terceiroVertice);
      console.log(`Primeiro vértice criado: x: ${primeiroVertice.getX()} y: ${primeiroVertice.getY()}`);
      console.log(`Segundo vértice criado: x: ${segundoVertice.getX()} y: ${segundoVertice.getY()}`);
      console.log(`Terceiro vértice criado: x: ${terceiroVertice.getX()} y: ${terceiroVertice.getY()}`);
      console.log(`Distância entre os vértices: ${distanciaEntreVertices}`);
      
      // verifica e exibe se os vértices são iguais
      console.log(`São vértices iguais? ${primeiroVertice.equals(segundoVertice, terceiroVertice)}.`);
    });
}

// chama a função para criar vértices se o script for executado como módulo principal
if (import.meta.url === `file://${process.argv[1]}`) {
  criarVertice();
}

// exporta a classe 'Vertice' para possível uso em outros módulos
export default Vertice;
