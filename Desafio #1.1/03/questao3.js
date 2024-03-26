import Vertice from "../01/questao1.js";

class Poligono {
  #verticesArray; 

  // construtor da classe Poligono, recebe uma quantidade variável de instâncias da classe Vertice
  constructor(...vertices) {
    // verifica se há pelo menos 3 vértices
    if (vertices.length < 3) {
      throw new Error("são necessários pelo menos 3 vértices.");
    }

    // verifica se todos os parâmetros são instâncias da classe Vertice
    if (vertices.some(v => !(v instanceof Vertice))) {
      throw new Error("todos os parâmetros devem ser instâncias da classe Vertice.");
    }

    // inicializa o array de vértices
    this.#verticesArray = vertices;
  }

  // retorna o array de vértices do polígono
  obterVertices() {
    return this.#verticesArray;
  }

  // adiciona um novo vértice ao polígono se ele não existir
  addVertice(novoVertice) {
    // verifica se o vértice já existe no polígono
    if (this.#verticesArray.some(v => v.equals(novoVertice))) {
      return false; // retorna false se o vértice já existir
    }

    // adiciona o novo vértice ao array
    this.#verticesArray.push(novoVertice);
    return true; // retorna true se o vértice foi adicionado com sucesso
  }

  // calcula e retorna o perímetro do polígono
  obterPerimetro() {
    let perimetro = 0;

    // itera sobre os vértices para calcular as distâncias e somar ao perímetro
    for (let i = 0; i < this.#verticesArray.length; i++) {
      const verticeAtual = this.#verticesArray[i];
      const proximoVertice = this.#verticesArray[(i + 1) % this.#verticesArray.length];

      perimetro += verticeAtual.distancia(proximoVertice);
    }

    return perimetro;
  }

  // retorna a quantidade de vértices do polígono
  obterQtdVertices() {
    return this.#verticesArray.length;
  }

  // cria e exibe o polígono com suas propriedades
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

// exemplo de uso:

// cria uma instância de Poligono com três vértices
const poligonoObj = new Poligono(
  new Vertice(1, 2),
  new Vertice(1, 2),
  new Vertice(1, 2)
);

// cria e exibe o polígono
poligonoObj.criarPoligono();

// adiciona um novo vértice
const novoVertice = new Vertice(2, 3);
const verticeAdicionado = poligonoObj.addVertice(novoVertice);

// exibe se o vértice foi adicionado com sucesso ou se já existe no polígono
if (verticeAdicionado) {
  console.log("Novo vértice adicionado com sucesso!");
} else {
  console.log("O vértice já existe no polígono, não foi adicionado novamente.");
}
