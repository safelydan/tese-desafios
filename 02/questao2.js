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

  get vertice1() {
    return this.#vertice1;
  }

  get vertice2() {
    return this.#vertice2;
  }

  get vertice3() {
    return this.#vertice3;
  }

  get perimetro() {
    const lado1 = this.#vertice1.distancia(this.#vertice2);
    const lado2 = this.#vertice1.distancia(this.#vertice3);
    const lado3 = this.#vertice2.distancia(this.#vertice3);
    return lado1 + lado2 + lado3;
  }

  tipo() {
    const lado1 = this.#vertice1.distancia(this.#vertice2);
    const lado2 = this.#vertice1.distancia(this.#vertice3);
    const lado3 = this.#vertice2.distancia(this.#vertice3);

    if (lado1 === lado2 && lado2 === lado3) {
      return "equilátero";
    } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
      return "isósceles";
    } else {
      return "escaleno";
    }
  }

  clone() {
    return new Triangulo(this.#vertice1, this.#vertice2, this.#vertice3);
  }

  get area() {
    const lado1 = this.#vertice1.distancia(this.#vertice2);
    const lado2 = this.#vertice1.distancia(this.#vertice3);
    const lado3 = this.#vertice2.distancia(this.#vertice3);
    const semiPerimetro = this.perimetro / 2;
    const area = Math.sqrt(semiPerimetro * (semiPerimetro - lado1) * (semiPerimetro - lado2) * (semiPerimetro - lado3));
    return area;
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

async function criarTrianguloUmPorUm(nomeTriangulo) {
  try {
    const answers = await inquirer.prompt([
      { type: "input", name: "x1", message: `digite a coordenada x do ${nomeTriangulo}: ` },
      { type: "input", name: "y1", message: `digite a coordenada y do ${nomeTriangulo}: ` },
      { type: "input", name: "x2", message: `digite a coordenada x do ${nomeTriangulo}: ` },
      { type: "input", name: "y2", message: `digite a coordenada y do ${nomeTriangulo}: ` },
      { type: "input", name: "x3", message: `digite a coordenada x do ${nomeTriangulo}: ` },
      { type: "input", name: "y3", message: `digite a coordenada y do ${nomeTriangulo}: ` },
    ]);

    const v1 = new Vertice(Number(answers.x1), Number(answers.y1));
    const v2 = new Vertice(Number(answers.x2), Number(answers.y2));
    const v3 = new Vertice(Number(answers.x3), Number(answers.y3));

    const triangulo = new Triangulo(v1, v2, v3);

    console.log(`${nomeTriangulo}:
    ------------ 
    vértice 1: ${triangulo.vertice1.getX()}, ${triangulo.vertice1.getY()}
    vértice 2: ${triangulo.vertice2.getX()}, ${triangulo.vertice2.getY()}
    vértice 3: ${triangulo.vertice3.getX()}, ${triangulo.vertice3.getY()}
    ------------`);
    triangulo.verificarTriangulo();

    return triangulo;
  } catch (error) {
    console.log(error.message);
  }
}

async function criarTriangulo() {
  try {
    const triangulo1 = await criarTrianguloUmPorUm("triângulo 1");
    const triangulo2 = await criarTrianguloUmPorUm("triângulo 2");
    const triangulo3 = await criarTrianguloUmPorUm("triângulo 3");

    console.log(`Resultados:
    ------------ 
    triangulo 1:
    ------------ 
    ${imprimirResultados(triangulo1)}
    triangulo 2:
    ------------
    ${imprimirResultados(triangulo2)}
    triangulo 3:
    ------------
    ${imprimirResultados(triangulo3)}`);

  } catch (error) {
    console.log(error.message);
  }
}

function imprimirResultados(triangulo) {
  return `tipo: ${triangulo.tipo()}
  perímetro: ${triangulo.perimetro}
  área: ${triangulo.area}
  --------------------`;
}

criarTriangulo();
