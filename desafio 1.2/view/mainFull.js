import inquirer from "inquirer";
import CadastroPaciente from "../controllers/CadastroPaciente.js";
import Paciente from "../models/Paciente.js";

async function cadastrarNovoPaciente() {
  console.log("----- Cadastro de Novo Paciente -----");
  const respostas = await inquirer.prompt([
    {
      type: "input",
      name: "nome",
      message: "Qual o nome do paciente?",
    },
    {
      type: "input",
      name: "cpf",
      message: "Qual o CPF do paciente?",
    },
    {
      type: "input",
      name: "dataNascimento",
      message: "Qual a data de nascimento do paciente? (Formato: DD/MM/AAAA)",
    },
  ]);

  const { nome, cpf, dataNascimento } = respostas;
  const paciente = new Paciente(nome, cpf, dataNascimento);

  if (paciente.validarCPF() && paciente.validarNome() && paciente.validarDataNascimento()) {
    return paciente;
  } else {
    console.log("Os dados do paciente são inválidos. Por favor, tente novamente.");
    return null;
  }
}

async function menu() {
  const cadastro = new CadastroPaciente();

  while (true) {
    console.log("\n----- Menu Principal -----");
    const resposta = await inquirer.prompt({
      type: "list",
      name: "opcao",
      message: "Escolha uma opção:",
      choices: ["Cadastrar novo paciente", "Listar pacientes cadastrados", "Sair"],
    });

    switch (resposta.opcao) {
      case "Cadastrar novo paciente":
        const novoPaciente = await cadastrarNovoPaciente();
        if (novoPaciente) {
          cadastro.adicionarPaciente(novoPaciente);
          console.log(`Paciente ${novoPaciente.nome} cadastrado com sucesso!`);
        }
        break;
      case "Listar pacientes cadastrados":
        cadastro.listarPacientesPorCPF();
        break;
      case "Sair":
        console.log("Encerrando o programa...");
        return;
    }
  }
}

menu();
