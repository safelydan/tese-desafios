// Interface para a classe Paciente
// Esta interface descreve as propriedades e métodos esperados em uma classe Paciente
// Os métodos aqui listados devem ser implementados pela classe Paciente
class Paciente {
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
  
  // Interface para a classe CadastroPaciente
  // Esta interface descreve as propriedades e métodos esperados em uma classe CadastroPaciente
  // Os métodos aqui listados devem ser implementados pela classe CadastroPaciente
  class CadastroPaciente {
    constructor() {
      this.pacientes = []; 
    }
  
    // Método para adicionar um paciente ao cadastro
    adicionarPaciente(paciente) {
      if (paciente instanceof Paciente) {
        this.pacientes.push(paciente);
        return true;
      } else {
        console.log("O objeto passado não é uma instância de Paciente.");
        return false;
      }
    }
  
    // Método para excluir um paciente do cadastro
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

  
  
  // Exportando as interfaces
  export { Paciente, CadastroPaciente };
  