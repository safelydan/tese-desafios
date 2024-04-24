import inquirer from "inquirer";
import { mainMenu } from "./menuPrincipal.js";
import {
  cadastrarPaciente,
  excluirPaciente,
  listarPacientesPorCPF,
  listarPacientesPorNome,
} from "../controllers/pacienteController.js";
import {
  agendarConsulta,
  cancelarAgendamento,
  listarConsultas,
} from "../controllers/consultasController.js";

export async function menuCadastro() {
  const resposta = await inquirer.prompt({
    type: "list",
    name: "opcao",
    message: "Escolha uma opção",
    choices: [
      "1-Cadastrar novo paciente",
      "2-Excluir paciente",
      "3-Listar pacientes (ordenado por CPF)",
      "4-Listar pacientes (ordenado por Nome)",
      "5-Voltar p/ menu principal",
    ],
  });

  switch (resposta.opcao) {
    case "1-Cadastrar novo paciente":
      cadastrarPaciente();
      break;
    case "2-Excluir paciente":
      await excluirPaciente();
      break;
    case "3-Listar pacientes (ordenado por CPF)":
      await listarPacientesPorCPF();
      break;
    case "4-Listar pacientes (ordenado por Nome)":
      await listarPacientesPorNome();
      break;
    case "5-Voltar p/ menu principal":
      mainMenu();
      break;
    default:
      console.log("Opção inválida. Tente novamente.");
  }
}

export async function menuAgenda() {
  const resposta = await inquirer.prompt({
    type: "list",
    name: "opcao",
    message: "Escolha uma opção:",
    choices: [
      "1-Agendar consulta",
      "2-Cancelar agendamento",
      "3-Listar agenda",
      "4-Voltar p/ menu principal",
    ],
  });

  switch (resposta.opcao) {
    case "1-Agendar consulta":
      await agendarConsulta();
      break;
    case "2-Cancelar agendamento":
      await cancelarAgendamento();
      break;
    case "3-Listar agenda":
      await listarConsultas();
      break;
    case "4-Voltar p/ menu principal":
      mainMenu();
      break;
    default:
      console.log("Opção inválida. Tente novamente.");
  }
}

