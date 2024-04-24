import inquirer from "inquirer";
import moment from "moment";
import { mainMenu } from "../view/menuPrincipal.js";
import Consulta from "../model/consulta.js";
import Paciente from "../model/paciente.js";

function formatarData(data) {
  return moment(data, "DD/MM/YYYY").format("YYYY-MM-DD");
}

export async function agendarConsulta() {
  try {
    const resposta = await inquirer.prompt([
      {
        type: "input",
        name: "cpf",
        message: "CPF do paciente: ",
        validate: function (cpf) {
          return (
            /^\d{11}$/.test(cpf) ||
            "CPF inválido. Por favor, digite corretamente"
          );
        },
      },
    ]);

    const paciente = await Paciente.findOne({ where: { cpf: resposta.cpf } });

    if (!paciente) {
      console.log(`Paciente com CPF ${resposta.cpf} não encontrado.`);
      return mainMenu();
    }

    console.log(`Paciente encontrado:
ID: ${paciente.toJSON().id}
Nome: ${paciente.toJSON().nome}
CPF: ${paciente.toJSON().cpf}`);

    const { PacienteId, data, horaInicial, horaFinal } = await inquirer.prompt([
      {
        type: "input",
        name: "PacienteId",
        message: "Confirme o ID do paciente: ",
      },
      {
        type: "input",
        name: "data",
        message: "Data da consulta (DD/MM/AAAA): ",
        validate: function (data) {
          return (
            /^\d{2}\/\d{2}\/\d{4}$/.test(data) ||
            "Data da consulta inválida. Por favor, digite no formato: DD/MM/AAAA"
          );
        },
      },
      {
        type: "input",
        name: "horaInicial",
        message: "Hora inicial da consulta (HH:MM): ",
        validate: function (horaInicial) {
          return (
            /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(horaInicial) ||
            "Formato de hora inválido. Use o formato HH:MM."
          );
        },
      },
      {
        type: "input",
        name: "horaFinal",
        message: "Hora final da consulta (HH:MM): ",
        validate: function (horaFinal) {
          return (
            /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(horaFinal) ||
            "Formato de hora inválido. Use o formato HH:MM."
          );
        },
      },
    ]);

    const dataFormatada = formatarData(data);

    await Consulta.create({
      PacienteId,
      data: dataFormatada,
      horaInicial,
      horaFinal,
    });

    console.log(
      `Consulta agendada para o paciente ${paciente.nome} no dia ${data}, das ${horaInicial} às ${horaFinal}.`
    );
  } catch (error) {
    console.error("Erro ao agendar consulta:", error);
  }
  mainMenu();
}

export async function cancelarAgendamento() {
  try {
    const resposta = await inquirer.prompt({
      type: "input",
      name: "cpf",
      message: "Digite o CPF do paciente cuja consulta deseja cancelar: ",
      validate: function (cpf) {
        return (
          /^\d{11}$/.test(cpf) || "CPF inválido. Por favor, digite corretamente"
        );
      },
    });

    const paciente = await Paciente.findOne({ where: { cpf: resposta.cpf } });

    if (!paciente) {
      console.log(`Paciente com CPF ${resposta.cpf} não encontrado.`);
      return mainMenu();
    }

    const consultas = await Consulta.findAll({
      where: { PacienteId: paciente.id },
    });

    if (consultas.length === 0) {
      console.log(
        `Não há consultas agendadas para o paciente com CPF ${resposta.cpf}.`
      );
      return mainMenu();
    }

    const consultaParaCancelar = await inquirer.prompt({
      type: "list",
      name: "consultaId",
      message: "Selecione a consulta que deseja cancelar: ",
      choices: consultas.map((consulta) => ({
        name: `Data: ${new Date(consulta.data).toLocaleDateString("pt-BR")} H.Ini: ${consulta.horaInicial} H.Fim: ${consulta.horaFinal} Nome: ${paciente.nome}`,
        value: consulta.id,
      })),
    });
    

    await Consulta.destroy({ where: { id: consultaParaCancelar.consultaId } });
    console.log("Consulta cancelada com sucesso.");
  } catch (error) {
    console.error("Erro ao cancelar agendamento:", error);
  }
  mainMenu();
}

export async function listarConsultas() {
  try {
    const consultas = await Consulta.findAll({ include: Paciente });
    console.log(
`----------------------------------------------------------------------------------------- 
  Data          H.Ini        H.Fim      Nome   
------------------------------------------------------------------------------------------`);
    consultas.forEach((consulta) => {
      const data = new Date(consulta.data);
      const dataFormatada = data.toLocaleDateString("pt-BR");
      const nomePaciente = consulta.Paciente
        ? consulta.Paciente.nome
        : "Paciente não encontrado";
console.log(`${dataFormatada}     ${consulta.horaInicial}     ${consulta.horaFinal}   ${nomePaciente}`
      );
    });
  } catch (error) {
    console.error("Erro ao listar consultas:", error);
  }
  mainMenu();
}
