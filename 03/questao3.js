import Vertice from "../01/questao1.js";

class Poligono {
  #verticesArray;

  constructor(...vertices) {
    if (vertices.length < 3) {
      throw new Error("São necessários pelo menos 3 vértices.");
    }

    if (vertices.some(v => !(v instanceof Vertice))) {
      throw new Error("Todos os parâmetros devem ser instâncias da classe Vertice.");
    }

    this.#verticesArray = vertices;
  }

  obterVertices() {
    return this.#verticesArray;
  }

  addVertice(novoVertice) {
    if (this.#verticesArray.some(v => v.equals(novoVertice))) {
      return false; 
    }

    this.#verticesArray.push(novoVertice);
    return true; 
  }

  obterPerimetro() {
    let perimetro = 0;

    for (let i = 0; i < this.#verticesArray.length; i++) {
      const verticeAtual = this.#verticesArray[i];
      const proximoVertice = this.#verticesArray[(i + 1) % this.#verticesArray.length];

      perimetro += verticeAtual.distancia(proximoVertice);
    }

    return perimetro;
  }

  obterQtdVertices() {
    return this.#verticesArray.length;
  }

  criarPoligono() {
    try {
      console.log("Polígono criado com sucesso.");
      console.log("Vértices do polígono:");
      this.#verticesArray.forEach((v, index) => {
        console.log(`Vértice ${index + 1}: 
          ${v.getX()}, ${v.getY()}`);
      });
      console.log("Perímetro do polígono:", this.obterPerimetro());
      console.log("Quantidade de vértices:", this.obterQtdVertices());
      return this;
    } catch (error) {
      console.error("Erro ao criar polígono:", error.message);
    }
  }
}

// Exemplo de uso:

const poligonoObj = new Poligono(
  new Vertice(1, 2),
  new Vertice(1, 2),
  new Vertice(1, 2)
);

poligonoObj.criarPoligono();

// Adicionando um novo vértice
const novoVertice = new Vertice(2, 3);
const verticeAdicionado = poligonoObj.addVertice(novoVertice);

if (verticeAdicionado) {
  console.log("Novo vértice adicionado com sucesso!");
} else {
  console.log("O vértice já existe no polígono, não foi adicionado novamente.");
}
