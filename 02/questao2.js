import inquirer from "inquirer";
import Vertice from "../01/questao1.js";

class Triangulo {
  #vertice1;
  #vertice2;
  #vertice3;

  constructor(vertice1, vertice2, vertice3) {
    if (
      !(vertice1 instanceof Vertice) ||
      !(vertice2 instanceof Vertice) ||
      !(vertice3 instanceof Vertice)
    ) {
      throw new Error("os parâmetros devem ser instâncias da classe Vertice.");
    }

    this.#vertice1 = vertice1;
    this.#vertice2 = vertice2;
    this.#vertice3 = vertice3;
  }

  // retorna o primeiro vértice do triângulo
  getVertice1() {
    return this.#vertice1;
  }

  // retorna o segundo vértice do triângulo
  getVertice2() {
    return this.#vertice2;
  }

  // retorna o terceiro vértice do triângulo
  getVertice3() {
    return this.#vertice3;
  }

  verificarTriangulo() {
    const lado1 = this.#vertice1.distancia(this.#vertice2);
    const lado2 = this.#vertice1.distancia(this.#vertice3);
    const lado3 = this.#vertice2.distancia(this.#vertice3);

    if (lado1 + lado2 > lado3 && lado1 + lado3 > lado2 && lado2 + lado3 > lado1) {
      console.log("é um triângulo.");
    } else {
      console.log("não é um triângulo válido.");
    }
  }
}

// função assíncrona para criar um triângulo interativamente
async function criarTrianguloUmPorUm(nomeTriangulo) {
  try {
    // solicita ao usuário as coordenadas dos vértices
    const answers = await inquirer.prompt([
      { type: "input", name: "x1", message: `digite a coordenada x do ${nomeTriangulo}: ` },
      { type: "input", name: "y1", message: `digite a coordenada y do ${nomeTriangulo}: ` },
      { type: "input", name: "x2", message: `digite a coordenada x do ${nomeTriangulo}: ` },
      { type: "input", name: "y2", message: `digite a coordenada y do ${nomeTriangulo}: ` },
      { type: "input", name: "x3", message: `digite a coordenada x do ${nomeTriangulo}: ` },
      { type: "input", name: "y3", message: `digite a coordenada y do ${nomeTriangulo}: ` },
    ]);

    // cria instâncias da classe Vertice com base nas respostas do usuário
    const v1 = new Vertice(Number(answers.x1), Number(answers.y1));
    const v2 = new Vertice(Number(answers.x2), Number(answers.y2));
    const v3 = new Vertice(Number(answers.x3), Number(answers.y3));

    // cria um triângulo com os vértices fornecidos
    const triangulo = new Triangulo(v1, v2, v3);

    // imprime as coordenadas dos vértices e verifica se é um triângulo válido
    console.log(`${nomeTriangulo}:`);
    imprimirTriangulo(triangulo);
  } catch (error) {
    // captura erros durante o processo e imprime a mensagem de erro
    console.log(error.message);
  }
}

// imprime as coordenadas dos vértices e verifica se é um triângulo válido
function imprimirTriangulo(triangulo) {
  console.log(`vértice 1: ${triangulo.getVertice1().getX()}, ${triangulo.getVertice1().getY()}`);
  console.log(`vértice 2: ${triangulo.getVertice2().getX()}, ${triangulo.getVertice2().getY()}`);
  console.log(`vértice 3: ${triangulo.getVertice3().getX()}, ${triangulo.getVertice3().getY()}`);
  triangulo.verificarTriangulo();
}

// função para criar três triângulos um por um
async function criarTriangulo() {
  await criarTrianguloUmPorUm("triângulo 1");
  await criarTrianguloUmPorUm("triângulo 2");
  await criarTrianguloUmPorUm("triângulo 3");
}

// chama a função para criar os triângulos
criarTriangulo();
