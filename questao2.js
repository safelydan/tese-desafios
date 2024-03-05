import inquirer from "inquirer";
import Vertice, { criarVertice } from "../01/questao1.js";

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
      throw new Error("parametros devem ser instancias da classe vertice ");
    }



    if (
      !(lado1 + lado2 > lado3 && lado1 + lado3 > lado2 && lado2 + lado3 > lado1)
    ) {
      throw new Error("os vértices não formam um triângulo válido.");
    }

    this.#vertice1 = vertice1;
    this.#vertice2 = vertice2;
    this.#vertice3 = vertice3;
  }

  getVertice1() {
    return this.#vertice1;
  }
  getVertice2() {
    return this.#vertice2;
  }
  getVertice3() {
    return this.#vertice3;
  }

  confereTriangulo() {

    const lado1 = this.#vertice1.distancia(this.#vertice2);
    const lado2 = this.#vertice1.distancia(this.#vertice3);
    const lado3 = this.#vertice2.distancia(this.#vertice3);
    if (
      !(lado1 + lado2 > lado3 && lado1 + lado3 > lado2 && lado2 + lado3 > lado1)
    ) {
      `é um troanuglo`
    }else{
      return `eh um triangulo`
    }
  }
}

