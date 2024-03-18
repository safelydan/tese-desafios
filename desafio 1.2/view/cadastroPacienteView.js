import inquirer from "inquirer";
import { cadastrarPaciente, listarPacientesPorCPF, listarPacientesPorNome } from "../controllers/CadastroPaciente.js";
import CadastroPaciente from "../controllers/CadastroPaciente.js";

async function menu() {
  const cadastroPaciente = new CadastroPaciente(); // Crie uma instância de CadastroPaciente
  while (true) {
    const resposta = await inquirer.prompt({
      type: "list",
      name: "opcao",
      message: "Menu Principal",
      choices: ["Cadastro de pacientes", "Agenda", "Fim"],
    });

    switch (resposta.opcao) {
      case "Cadastro de pacientes":
        await menuCadastro(cadastroPaciente); // Passe a instância de CadastroPaciente
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


async function menuCadastro(cadastroPaciente) {
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
        await cadastrarPaciente(cadastroPaciente); // Passa a instância de cadastroPaciente
        break;
      case "2-Excluir paciente":
        // Implemente a lógica para excluir um paciente
        break;
      case "3-Listar pacientes (ordenado por CPF)":
        const pacientesPorCPF = await listarPacientesPorCPF(cadastroPaciente); // Passa a instância de cadastroPaciente
        if (pacientesPorCPF.length === 0) {
          console.log("Não há pacientes cadastrados.");
        } else {
          console.log("Pacientes ordenados por CPF:");
          pacientesPorCPF.forEach(paciente => {
            console.log(`Nome: ${paciente.nome}, CPF: ${formatarCPF(paciente.cpf)}, Data de Nascimento: ${paciente.dataNascimento}`);
          });
        }
        break;
      case "4-Listar pacientes (ordenado por Nome)":
        const pacientesPorNome = await listarPacientesPorNome(cadastroPaciente); // Passa a instância de cadastroPaciente
        console.log("Pacientes ordenados por Nome:");
        pacientesPorNome.forEach(paciente => {
          console.log(`Nome: ${paciente.nome}, CPF: ${formatarCPF(paciente.cpf)}, Data de Nascimento: ${paciente.dataNascimento}`);
        });
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
