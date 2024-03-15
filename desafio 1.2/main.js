import inquirer from "inquirer";
import { cadastrarPaciente } from "./CadastroPaciente.js";
import Paciente from "./Paciente.js";

async function menu() {
  while (true) {
    const resposta = await inquirer.prompt({
      type: "list",
      name: "opcao",
      message: "Menu Principal",
      choices: ["Cadastro de pacientes", "Agenda", "Fim"],
    });

    switch (resposta.opcao) {
      case "Cadastro de pacientes":
        await menuCadastro();
        break;
      case "Agenda":
        await menuAgenda();
        break;
      case "Fim":
        console.log("Programa encerrado.");
        return;
    }
  }
}

async function menuCadastro() {
  while (true) {
    const resposta = await inquirer.prompt({
      type: "list",
      name: "opcao",
      message: "Menu de Cadastro de Pacientes",
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
        await cadastrarPaciente();
        break;
      case "2-Excluir paciente":
        // Implemente a lógica para excluir um paciente
        break;
      case "3-Listar pacientes (ordenado por CPF)":
        listarPacientes();
        break;
      case "4-Listar pacientes (ordenado por nome)":
        // Implemente a lógica para listar pacientes ordenados por nome
        break;
      case "5-Voltar p/ menu principal":
        return;
    }
  }
}

async function cadastrarNovoPaciente() {
  const respostaNome = await inquirer.prompt({
    type: "input",
    name: "nome",
    message: "Qual o nome do paciente?",
  });

  // Aqui você pode realizar a lógica para cadastrar o novo paciente
  console.log(`Paciente ${respostaNome.nome} cadastrado com sucesso.`);
}

async function menuAgenda() {
  while (true) {
    const resposta = await inquirer.prompt({
      type: "list",
      name: "opcao",
      message: "Agenda",
      choices: [
        "Agendar consulta",
        "Cancelar agendamento",
        "Listar agenda",
        "Voltar p/ menu principal",
      ],
    });

    switch (resposta.opcao) {
      case "Agendar consulta":
        // Implemente a lógica para agendar uma consulta
        break;
      case "Cancelar agendamento":
        // Implemente a lógica para cancelar um agendamento
        break;
      case "Listar agenda":
        // Implemente a lógica para listar a agenda
        break;
      case "Voltar p/ menu principal":
        return;
    }
  }
}

menu();
