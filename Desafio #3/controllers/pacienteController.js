import inquirer from "inquirer";
import { mainMenu } from "../view/menuPrincipal.js";
import Paciente from "../model/paciente.js";
import moment from "moment";

export async function cadastrarPaciente() {
  try {
    const resposta = await inquirer.prompt([
      {
        type: "input",
        name: "nome",
        message: "Nome do paciente: ",
        validate: function (nome) {
          return (
            nome.trim().length > 4 || "O nome deve ter ao menos 5 caracteres"
          );
        },
      },
      {
        type: "input",
        name: "cpf",
        message: "CPF do paciente: ",
        validate: function (cpf) {
          return (
            /^\d{11}$/.test(cpf) ||
            "CPF inválido. Por favor digite corretamente"
          );
        },
      },
      {
        type: "input",
        name: "dataNascimento",
        message: "Data de Nascimento do paciente (DD/MM/AAAA): ",
        validate: function (dataNascimento) {
          if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataNascimento)) {
            return "Data de nascimento no formato inválido. Por favor, digite no formato: DD/MM/AAAA";
          }
          const dataFormatada = moment(dataNascimento, "DD/MM/YYYY");
          const idade = moment().diff(dataFormatada, "years");
          return (
            idade >= 13 || "O paciente deve ter pelo menos 13 anos de idade."
          );
        },
      },
    ]);

    resposta.dataNascimento = moment(
      resposta.dataNascimento,
      "DD/MM/YYYY"
    ).format("YYYY-MM-DD");

    const novoPaciente = await Paciente.create(resposta);
    console.log(`Paciente ${novoPaciente.nome} adicionado.`);
  } catch (error) {
    console.error("Erro ao cadastrar paciente:", error);
  }
  mainMenu();
}

export async function excluirPaciente() {
  try {
    const resposta = await inquirer.prompt({
      type: "input",
      name: "cpf",
      message: "Digite o CPF do paciente que deseja excluir: ",
      validate: function (cpf) {
        return (
          /^\d{11}$/.test(cpf) || "CPF inválido. Por favor digite corretamente"
        );
      },
    });
    const pacienteExcluido = await Paciente.destroy({
      where: { cpf: resposta.cpf },
    });
    if (pacienteExcluido > 0) {
      console.log("Paciente excluído com sucesso.");
    } else {
      console.log("Paciente não encontrado.");
    }
  } catch (error) {
    console.error("Erro ao excluir paciente:", error);
  }
  mainMenu();
}

export async function listarPacientesPorCPF() {
  try {
    const pacientes = await Paciente.findAll({ order: [["cpf", "ASC"]] });
    console.log("Lista de pacientes ordenada por CPF:");
    pacientes.forEach((paciente) => {
      const dataNascimento = new Date(paciente.dataNascimento);
      const dataFormatada = dataNascimento.toLocaleDateString("pt-BR");
      console.log(
        `Nome: ${paciente.nome} CPF: ${paciente.cpf} Data de Nascimento: ${dataFormatada}`
      );
    });
  } catch (error) {
    console.error("Erro ao listar pacientes por CPF:", error);
  }
  mainMenu();
}

export async function listarPacientesPorNome() {
  try {
    const pacientes = await Paciente.findAll({ order: [["nome", "ASC"]] });
    console.log("Lista de pacientes ordenada por nome:");
    pacientes.forEach((paciente) => {
      const dataNascimento = new Date(paciente.dataNascimento);
      const dataFormatada = dataNascimento.toLocaleDateString("pt-BR");
      console.log(
        `Nome: ${paciente.nome}, CPF: ${paciente.cpf}, Data de Nascimento: ${dataFormatada}`
      );
    });
  } catch (error) {
    console.error("Erro ao listar pacientes por nome:", error);
  }
  mainMenu();
}
