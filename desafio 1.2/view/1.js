// CadastroPaciente.js

// Interface para a classe CadastroPaciente
// Esta interface descreve as propriedades e métodos esperados em uma classe CadastroPaciente
// Os métodos aqui listados devem ser implementados pela classe CadastroPaciente
import Paciente from './Paciente.js';

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

  // Método para listar os pacientes cadastrados
  listarPacientes() {
    console.log("Pacientes cadastrados:");
    this.pacientes.forEach((paciente, index) => {
      console.log(`${index + 1}. Nome: ${paciente.nome}, CPF: ${paciente.cpf}, Data de Nascimento: ${paciente.dataNascimento}`);
    });
  }
}
export {CadastroPaciente}



