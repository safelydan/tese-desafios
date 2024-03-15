const Aluno = require("./Aluno");

class Turma {
  alunos;

  constructor() {
    this.alunos = [];
  }

  adicionarAluno(aluno) {
    const alunoExistente = this.alunos.find(a => a.matricula === aluno.matricula);
    if(!alunoExistente){
      this.alunos.push(aluno);
    }
  }

  removerAluno(matricula) {
    this.alunos = this.alunos.filter(aluno => aluno.matricula !== matricula);
  }

  buscarAluno(matricula) {
    return this.alunos.find(aluno => aluno.matricula === matricula);
  }


  lancarNota(matricula, prova, nota) {
    const aluno = this.buscarAluno(matricula);

    if (aluno) {
      if (prova === "P1") {
        aluno.fazerProva(nota);
      } else if (prova === "P2") {
        aluno.fazerProva2(nota);
      } else {
        console.log("Prova inválida. Use 'P1' ou 'P2'.");
      }
    } else {
      console.log("Aluno não encontrado.");
    }
  }

  calcularMediaAluno(matricula) {
    const aluno = this.buscarAluno(matricula);

    if (aluno) {
      const media = (aluno.nota1 + aluno.nota2) / 2;
    } else {
      console.log("Aluno não encontrado.");
    }
  }

imprimirAlunosEmOrdemAlfabetica() {
  const alunosOrdenados = this.alunos.slice().sort((a, b) => a.nome.localeCompare(b.nome));

  console.log(`
------------------------------------------------------------
  Matrícula Nome                  P1    P2    NF
----------------------------------------------------------`);
  alunosOrdenados.forEach(aluno => {
    const mediaFinal = (aluno.nota1 + aluno.nota2) / 2;
    console.log(`      ${aluno.matricula}     ${aluno.nome.padEnd(20)}  ${aluno.nota1.toString().padEnd(3) || "-"}   ${aluno.nota2.toString().padEnd(3) || "-"}   ${mediaFinal.toFixed(1).padEnd(4)}  `);
  });
  console.log(` --------------------------------------------------------`);
}

}

const turma = new Turma();
const aluno1 = new Aluno(2, "Joao Pedro");
const aluno2 = new Aluno(1, "Eandro Cleiton");

turma.adicionarAluno(aluno1);
turma.adicionarAluno(aluno2);

turma.lancarNota(1, "P1", 2);
turma.lancarNota(1, "P2", 3);
turma.lancarNota(2, "P1", 2);
turma.lancarNota(2, "P2", 4);

turma.imprimirAlunosEmOrdemAlfabetica();