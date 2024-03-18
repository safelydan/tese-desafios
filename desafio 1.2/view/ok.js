class Paciente {
    constructor(nome, cpf, dataNascimento) {
      this.nome = nome;
      this.cpf = cpf;
      this.dataNascimento = dataNascimento;
    }
  
    validarCPF() {
      return /^\d{11}$/.test(this.cpf);
    }
  
    validarNome() {
      if (this.nome.length <= 4) {
        console.log("O nome deve ter ao menos 5 caracteres");
        return false;
      }
      return true;
    }
  
    validarDataNascimento() {
      const dataNascimento = new Date(this.dataNascimento);
      const hoje = new Date();
      const diferencaMilissegundos = hoje.getTime() - dataNascimento.getTime();
      const idade = diferencaMilissegundos / (1000 * 60 * 60 * 24 * 365.25);
      return idade >= 18;
    }
  
    calcularIdade() {
      const dataNascimento = new Date(this.dataNascimento);
      const hoje = new Date();
      const diferencaMilissegundos = hoje.getTime() - dataNascimento.getTime();
      return Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24 * 365.25));
    }
  }
  
  class CadastroPaciente {
    constructor() {
      this.pacientes = []; 
    }
  
    adicionarPaciente(paciente) {
      if (paciente instanceof Paciente) {
        this.pacientes.push(paciente);
        return true;
      } else {
        console.log("O objeto passado não é uma instância de Paciente.");
        return false;
      }
    }
  
    excluirPaciente(cpf) {
      const index = this.pacientes.findIndex((paciente) => paciente.cpf === cpf);
      if (index !== -1) {
        this.pacientes.splice(index, 1);
        return true;
      } else {
        return false;
      }
    }
  
    listarPacientes() {
      console.log("Pacientes cadastrados:");
      this.pacientes.forEach((paciente, index) => {
        console.log(`${index + 1}. Nome: ${paciente.nome}, CPF: ${paciente.cpf}, Data de Nascimento: ${paciente.dataNascimento}`);
      });
    }
  }
  
  export { Paciente, CadastroPaciente };
  