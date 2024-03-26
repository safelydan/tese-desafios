import inquirer from "inquirer";
import CadastroPaciente from "../controllers/CadastroPaciente.js";
import {
  cadastrarNovoPaciente,
  excluirPacienteExistente,
} from "../controllers/CadastroPaciente.js";
import ConsultaController from "../controllers/ConsultaController.js";

const cadastro = new CadastroPaciente();
const consultaController = new ConsultaController();

async function menuPrincipal() {
  while (true) {
    const resposta = await inquirer.prompt({
      type: "list",
      name: "opcao",
      message: "Escolha uma opção:",
      choices: ["1-Cadastro de pacientes", "2-Agenda", "3-Fim"],
    });

    switch (resposta.opcao) {
      case "1-Cadastro de pacientes":
        await menuCadastro();
        break;
      case "2-Agenda":
        await menuConsulta();
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
        const novoPaciente = await cadastrarNovoPaciente(cadastro);
        if (novoPaciente !== null) {
          const pacienteAdicionado = cadastro.adicionarPaciente(novoPaciente);
          if (pacienteAdicionado) {
            console.log(`
          Paciente cadastrado com sucesso!`);
          } else {
            console.log(`
          Falha ao cadastrar o paciente.`);
          }
        }
        break; 

      case "2-Excluir paciente":
        await excluirPacienteExistente(cadastro);
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

async function menuConsulta() {
  while (true) {
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
        await consultaController.agendarConsultaInterativa();
        break;
      case "2-Cancelar agendamento":
        await consultaController.cancelarConsultaInterativa();
        break;
      case "3-Listar agenda":
        consultaController.listarConsultas();
        break;
      case "4-Voltar p/ menu principal":
        return;
    }
  }
}

menuPrincipal();
