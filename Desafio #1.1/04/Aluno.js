
class Aluno {
    matricula;
    nome;
    nota1;
    nota2;
  
    constructor(matricula, nome) {
      this.matricula = matricula;
      this.nome = nome;
      this.nota1 = null;
      this.nota2 = null;
    }
  
    fazerProva(nota) {
      if (nota >= 0 && nota <= 10) {
        this.nota1 = nota;
        console.log(`O aluno ${this.nome} obteve ${nota} na primeira prova.`);
      } else {
        console.log(`Valor inválido para a primeira prova.`);
      }
    }
  
    fazerProva2(nota) {
      if (nota >= 0 && nota <= 10) {
        this.nota2 = nota;
        console.log(`O aluno ${this.nome} obteve ${nota} na segunda prova.`);
      } else {
        console.log(`Valor inválido para a segunda prova.`);
      }
    }
  
    faltarProva1() {
      console.log(`O aluno ${this.nome} faltou à primeira prova.`);
    }
  
    faltarProva2() {
      console.log(`O aluno ${this.nome} faltou à segunda prova.`);
    }
  }
  
  module.exports = Aluno;
  