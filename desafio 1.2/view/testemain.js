import inquirer from "inquirer";
import CadastroPaciente from "../controllers/CadastroPaciente.js";
import { cadastrarNovoPaciente } from "../controllers/CadastroPaciente.js";
import Paciente from "../models/Paciente.js";

const cadastro = new CadastroPaciente();

async function menuPrincipal() {
  while (true) {
    const resposta = await inquirer.prompt({
      type: "list",
      name: "opcao",
      message: "Escolha uma opção:",
      choices: ["1-Cadastro de pacientes", "2-Agenda", "3-Fim"],
    });

    switch (resposta.opcao) {
      case "1-Cadastro de pacientes":      await menuCadastro(); 
        break;
      case "2-Agenda":
        cadastro.listarPacientes();
        break;
      case "3-Fim": 
        console.log("Encerrando o programa...");
        return;
    }
  }
}



async function menuCadastro() {
  while (true) {
    const resposta = await inquirer.prompt({
      type: "list",
      name: "opcao",
      message: "Escolha uma opção:",
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
        const novoPaciente = await cadastrarNovoPaciente();
        if (novoPaciente) {
          cadastro.adicionarPaciente(novoPaciente);
          console.log(`Paciente ${novoPaciente.nome} cadastrado com sucesso!`);
        }
        break;

      case "3-Listar pacientes (ordenado por CPF)":
        cadastro.listarPacientesPorCPF();
        break;
      case "4-Listar pacientes (ordenado por Nome)":
        cadastro.listarPacientesPorNome();
        break;
      case "5-Voltar p/ menu principal": 
        return;
    }
  }
}

menuPrincipal();
