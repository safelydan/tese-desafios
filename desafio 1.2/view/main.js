import inquirer from "inquirer";
import CadastroPaciente from "../controllers/CadastroPaciente.js";
import { cadastrarNovoPaciente } from "../controllers/CadastroPaciente.js";
import Agenda from "../controllers/ConsultaView.js"
import Paciente from "../models/Paciente.js";

const cadastro = new CadastroPaciente();
const agenda = new Agenda();

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
        agenda.iniciar();
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

async function menuAgenda() {
  while (true) {
    console.log("\n=== Menu ===");

    const { opcao } = await inquirer.prompt({
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma opção:',
      choices: [
        { name: 'Agendar consulta', value: '1' },
        { name: 'Cancelar consulta', value: '2' },
        { name: 'Listar agenda', value: '3' }, // Nova opção para listar consultas
        { name: 'Voltar p/ menu principal', value: '4' }
      ]
    });

    switch (opcao) {
      case '1':
        await this.consultaController.agendarConsultaInterativa();
        break;
      case '2':
        await this.consultaController.cancelarConsultaInterativa();
        break;
      case '3':
        this.consultaController.listarConsultas(); // Chamada para o método listarConsultas
        break;
      case '4':
        console.log("Saindo...");
        return;
      default:
        console.log("Opção inválida.");
    }
  }
}

menuPrincipal();
