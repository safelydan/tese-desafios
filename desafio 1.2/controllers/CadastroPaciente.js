import Paciente from "../models/Paciente.js";

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


  listarPacientesPorCPF() {
    const pacientesOrdenados = this.pacientes.slice().sort((a, b) => {
      const cpfA = parseInt(a.cpf.replace(/\D/g, ''));
      const cpfB = parseInt(b.cpf.replace(/\D/g, ''));
      return cpfA - cpfB;
    });
    console.log("Pacientes cadastrados (ordenados por CPF):");
    pacientesOrdenados.forEach((paciente, index) => {
      console.log(`${index + 1}. Nome: ${paciente.nome}, CPF: ${paciente.cpf}, Data de Nascimento: ${paciente.dataNascimento}`);
    });
  }
  

  listarPacientesPorNome() {
    const pacientesOrdenados = this.pacientes.slice().sort((a, b) => {
      return a.nome.localeCompare(b.nome);
    });
    console.log("Pacientes cadastrados (ordenados por Nome):");
    pacientesOrdenados.forEach((paciente, index) => {
      console.log(`${index + 1}. Nome: ${paciente.nome}, CPF: ${paciente.cpf}, Data de Nascimento: ${paciente.dataNascimento}`);
    });
  }
}

export default CadastroPaciente;