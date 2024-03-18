// Paciente.js

// Interface para a classe Paciente
// Esta interface descreve as propriedades e métodos esperados em uma classe Paciente
// Os métodos aqui listados devem ser implementados pela classe Paciente
export default class Paciente {
  constructor(nome, cpf, dataNascimento) {
    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
  }

  // Método para validar o CPF do paciente
  validarCPF() {
    return /^\d{11}$/.test(this.cpf);
  }

  // Método para validar o nome do paciente
  validarNome() {
    if (this.nome.length <= 4) {
      console.log("O nome deve ter ao menos 5 caracteres");
      return false;
    }
    return true;
  }

  // Método para validar a data de nascimento do paciente
  validarDataNascimento() {
    const dataNascimento = new Date(this.dataNascimento);
    const hoje = new Date();
    const diferencaMilissegundos = hoje.getTime() - dataNascimento.getTime();
    const idade = diferencaMilissegundos / (1000 * 60 * 60 * 24 * 365.25);
    return idade >= 18;
  }

  // Método para calcular a idade do paciente
  calcularIdade() {
    const dataNascimento = new Date(this.dataNascimento);
    const hoje = new Date();
    const diferencaMilissegundos = hoje.getTime() - dataNascimento.getTime();
    return Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24 * 365.25));
  }
}
