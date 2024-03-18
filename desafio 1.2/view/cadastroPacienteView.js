import inquirer from "inquirer";
import { cadastrarPaciente, listarPacientesPorNome, listarPacientesPorCPF } from "../controllers/CadastroPaciente.js";
import CadastroPaciente from "../controllers/CadastroPaciente.js";
import Paciente from "../models/Paciente.js";

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
  const cadastro = new CadastroPaciente(); 
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
        await cadastrarPaciente(); // Aqui está a correção
        break;
      case "2-Excluir paciente":
        // Implemente a lógica para excluir um paciente
        break;
      case "3-Listar pacientes (ordenado por CPF)":
        console.log("Pacientes cadastrados:");
        cadastro.pacientes.forEach((paciente, index) => {
        console.log(`${index + 1}. Nome: ${paciente.nome}, CPF: ${paciente.cpf}, Data de Nascimento: ${paciente.dataNascimento}`);
});
        break;
      case "4-Listar pacientes (ordenado por nome)":
        listarPacientesPorNome(cadastro)
      break;
      case "5-Voltar p/ menu principal":
        return;
    }
  }
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
