import inquirer from "inquirer";

export default class CadastroPaciente {
  constructor() {
    this.pacientes = [];
  }

  adicionarPaciente(respostas) {
    const paciente = {
      nome: respostas.nome,
      cpf: respostas.cpf,
      dataNascimento: respostas.dataNascimento,
    };

    if (
      this.validarCPF(paciente.cpf) &&
      this.validarNome(paciente.nome) &&
      this.validarDataNascimento(paciente.dataNascimento)
    ) {
      this.pacientes.push(paciente);
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

  listarPacientesPorCPF() {
    return this.pacientes.slice().sort((a, b) => a.cpf.localeCompare(b.cpf));
  }

  listarPacientesPorNome() {
    return this.pacientes.slice().sort((a, b) => a.nome.localeCompare(b.nome));
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
      return cpfValido ? true : `Erro. Conserte o CPF.`;
    },
  },
  {
    type: "input",
    name: "dataNascimento",
    message: "Qual a data de nascimento do paciente? (Formato: DD/MM/AAAA) ",
    validate: function (value) {
      const dataValida = /^(\d{2})\/(\d{2})\/(\d{4})$/.test(value);
      return dataValida ? true : `Data de nascimento invalidada`;
    },
  },
];

export function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export async function cadastrarPaciente() {
  try {
    const respostas = await inquirer.prompt(perguntas);
    console.log(`Paciente ${respostas.nome} cadastrado com sucesso.`);
    return respostas;
  } catch (error) {
    console.log(`Erro ao cadastrar o paciente. ${error}`);
    throw error;
  }
}
