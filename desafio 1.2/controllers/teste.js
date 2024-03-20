import Paciente from "../models/Paciente.js";
import inquirer from 'inquirer';
import ConsultaController from '../../../ConsultaController.js';
import Agenda from '../view/consultaView.js';

let consultaController = new ConsultaController();
let agenda = new Agenda(consultaController);

// Function to handle interactive consultation scheduling
async function scheduleConsultation() {
    const consultationDetails = await promptConsultationDetails();
    const { nome, cpf, idade, data, horaInicial, horaFinal } = consultationDetails;
    
    const paciente = new Paciente(nome, cpf, idade);
    const success = cadastrarNovoPaciente(paciente);
    
    if (success) {
        consultaController.agendarConsulta(paciente.cpf, data, horaInicial, horaFinal);
        agenda.mostrarConsultas();
    } else {
        console.log("Erro ao cadastrar paciente ou paciente já cadastrado.");
    }
}

// Function to prompt user for consultation details
async function promptConsultationDetails() {
    const questions = [
        {
            type: 'input',
            name: 'nome',
            message: 'Nome do paciente:'
        },
        {
            type: 'input',
            name: 'cpf',
            message: 'CPF do paciente:',
            validate: function(cpf) {
                if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf)) {
                    console.log("CPF inválido. Por favor digite corretamente.");
                    return false;
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'idade',
            message: 'Idade do paciente:'
        },
        {
            type: 'input',
            name: 'data',
            message: 'Data da consulta (DD/MM/AAAA):',
            validate: function(data) {
                if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
                    console.log("Data inválida. Por favor digite corretamente.");
                    return false;
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'horaInicial',
            message: 'Hora inicial da consulta (HHMM):'
        },
        {
            type: 'input',
            name: 'horaFinal',
            message: 'Hora final da consulta (HHMM):'
        }
    ];

    return await inquirer.prompt(questions);
}

// Prompt user for action (schedule or cancel)
async function promptAction() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Escolha uma ação:',
            choices: ['Agendar consulta', 'Cancelar consulta']
        }
    ]);

    if (action === 'Agendar consulta') {
        await scheduleConsultation();
    } else {
        await cancelConsultation();
    }
}

// Function to handle interactive consultation cancellation
async function cancelConsultation() {
    const questions = [
        {
            type: 'input',
            name: 'cpf',
            message: 'CPF do paciente da consulta a ser cancelada:'
        },
        {
            type: 'input',
            name: 'data',
            message: 'Data da consulta a ser cancelada (DD/MM/AAAA):'
        },
        {
            type: 'input',
            name: 'horaInicial',
            message: 'Hora inicial da consulta a ser cancelada (HHMM):'
        }
    ];

    const { cpf, data, horaInicial } = await inquirer.prompt(questions);
    consultaController.cancelarConsulta(cpf, data, horaInicial);
    // Show consultations after cancellation
    agenda.mostrarConsultas();
}

// Prompt user for action
promptAction();
