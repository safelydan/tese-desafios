import Vertice from "../01/questao1.js";

class Poligono {
  #vertices;

  constructor(...vertices) {
    if (vertices.length < 3) {
      throw new Error("São necessários pelo menos 3 vértices.");
    }

    if (vertices.some(v => !(v instanceof Vertice))) {
      throw new Error("Todos os parâmetros devem ser instâncias da classe Vertice.");
    }

    this.#vertices = vertices;
  }

  getVertices() {
    return this.#vertices;
  }

  criarPoligono() {
    try {
      console.log("Polígono criado com sucesso!");
      console.log("Vértices do polígono:");
      this.#vertices.forEach((v, index) => {
        console.log(`Vértice ${index + 1}: 
          ${v.getX()}, ${v.getY()}`);
      });
      return this;
    } catch (error) {
      console.error("Erro ao criar polígono:", error.message);
    }
  }
}

// Crie uma instância de Poligono fornecendo os vértices necessários
const poligonoObj = new Poligono(
  new Vertice(1, 2),
  new Vertice(1, 2),
  new Vertice(1, 2),
  new Vertice(1, 2),
  new Vertice(1, 2)
);

// Chame o método criarPoligono na instância de Poligono
poligonoObj.criarPoligono();
