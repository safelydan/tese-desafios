import inquirer from "inquirer";
import Paciente from "../models/Paciente.js";

export default class CadastroPaciente {
  constructor() {
    this.pacientes = [];
  }

  adicionarPaciente(paciente) {
    if (
      this.validarCPF(paciente.cpf) &&
      this.validarNome(paciente.nome) &&
      this.validarDataNascimento
    ) {
      this.pacientes.push(pacientes);
      return true;
    } else {
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
}

export const perguntas = [
  {
    type: "input",
    name: "nome",
    message: "Qual o nome do paciente? ",
    validate: function (value) {
      if (value.length < 5) {
        return "O nome do paciente deve ter pelo menos 5 caracteres.";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "cpf",
    message: "Qual o CPF do paciente? ",
    validate: function (value) {
      const cpfValido = /^\d{11}$/.test(value);

      if (cpfValido) {
        return true;
      } else {
        return `Erro. Conserte o CPF.`;
      }
    },
  },
  {
    type: "input",
    name: "dataNascimento",
    message: "Qual a data de nascimento do paciente? (Formato: DD/MM/AAAA) ",
    validate: function (value) {
      const dataValida = /^(\d{2})\/(\d{2})\/(\d{4})$/.test(value);

      if (dataValida) {
        return true;
      } else {
        return `Data de nascimento invalidada`;
      }
    },
  },
];

export function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export async function cadastrarPaciente() {
  try {
    const respostas = await inquirer.prompt(perguntas);
    console.log(`
Paciente ${respostas.nome} cadastrado com sucesso.`);
  } catch (error) {
    console.log(`Erro ao cadastrar o paciente. ${error}`);
  }
}
