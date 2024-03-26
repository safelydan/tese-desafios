# Desafio Back-end Node.js/Express

Este repositório contém a solução para as questões propostas no Desafio Back-end Node.js/Express.

## Questão 1 - Vertice

A classe `Vertice` foi implementada conforme as seguintes especificações:

- Atributos privados `x` e `y` com leitura pública.
- Construtor para inicializar os valores de `x` e `y`.
- Método getter `distancia` para calcular a distância euclidiana de um vértice a outro.
- Método `move` para mover o vértice para outra posição (x, y).
- Método `equals` para verificar se dois vértices são iguais.

Para utilizar a classe, execute o programa `questao1.js`, que lerá valores do usuário para criar 3 vértices e chamar os métodos implementados na classe.

## Questão 2 - Triangulo

A classe `Triangulo` foi implementada com base na classe `Vertice`. Ela possui:

- Construtor para inicializar os vértices do triângulo, gerando uma exceção caso não formem um triângulo.
- Método `equals` para verificar se dois triângulos são iguais.
- Método getter `perimetro` para retornar o perímetro do triângulo.
- Método `tipo` para retornar o tipo do triângulo (equilátero, isósceles ou escaleno).
- Método `clone` para clonar um triângulo.
- Método getter `area` para retornar a área do triângulo.

Execute o programa `questao2.js` para criar 3 triângulos e chamar os métodos implementados na classe.

## Questão 3 - Poligono

A classe `Poligono` foi criada com base na classe `Vertice` e possui:

- Construtor para inicializar os vértices do polígono, gerando uma exceção caso não tenha pelo menos 3 vértices.
- Método booleano `addVertice` para adicionar um novo vértice ao polígono.
- Método getter `perimetro` para retornar o perímetro do polígono.
- Método getter `qtdVertices` para retornar a quantidade de vértices do polígono.

Execute o programa `questao3.js` para criar um polígono e chamar os métodos implementados na classe.

## Questão 4 - Turma

A classe `Turma` foi implementada para gerenciar alunos, com métodos para inserir, remover, lançar notas e imprimir a lista de alunos.

Execute o programa `questao4.js` para inserir dados dos alunos e imprimir a lista conforme o layout especificado.

## Questão 5 - Aplicação de Entrada de Dados

O programa `questao5.js` é uma aplicação que recebe dados de um cliente pelo console, aplicando regras específicas para cada campo.

Execute o programa `questao5.js` para inserir os dados do cliente e verificar as validações.

**Observação:**

- Certifique-se de ter o Node.js instalado para executar os programas.
- Os programas foram desenvolvidos seguindo as instruções fornecidas nas questões.
