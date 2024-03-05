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

  criarTriangulo(){
    inquirer.prompt([{type: "input", name: "x1", message: "x1: " }])
    inquirer.prompt([{type: "input", name: "y1", message: "y2: " }])
    inquirer.prompt([{type: "input", name: "x2", message: "x2" }])
    inquirer.prompt([{type: "input", name: "y2", message: "y2" }])
    inquirer.prompt([{type: "input", name: "x3", message: "x3" }])
    inquirer.prompt([{type: "input", name: "y3", message: "y3" }])
    .then((answers)=>{
      try{
        const v1 = new Vertice(Number(answers.x1), Number(answers.y1))
        const v2 = new Vertice(Number(answers.x2), Number(answers.y2))
        const v3 = new Vertice(Number(answers.x3), Number(answers.y3))
        const triangulo = new Triangulo(v1, v2, v3)

        console.log(``)


        triangulo.confereTriangulo();
      }catch(error){
        console.log(error.message)
      }
    })


  }
}


criarTriangulo()