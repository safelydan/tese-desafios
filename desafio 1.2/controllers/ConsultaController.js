import Paciente from "../models/Paciente.js";
import Consulta from "../models/Consulta.js";
import Agenda from "./consultaView.js";

class ConsultaController {
    constructor() {
        this.pacientes = [];
        this.consultas = [];
    }

    adicionarPaciente(paciente) {
        paciente.consultas = []; // Inicializa a propriedade consultas para o paciente
        this.pacientes.push(paciente);
    }
    

    buscarPacientePorCPF(cpf) {
        return this.pacientes.find(paciente => paciente.cpf === cpf);
    }

    removerPacientePorCPF(cpf) {
        this.pacientes = this.pacientes.filter(paciente => paciente.cpf !== cpf);
    }

    agendarConsulta(pacienteCPF, data, horaInicial, horaFinal) {
        const paciente = this.buscarPacientePorCPF(pacienteCPF);
        
        if (!paciente) {
            console.log("Erro: Paciente não encontrado.");
            return;
        }

        // Validar formato da data (DD/MM/AAAA)
        const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dataRegex.test(data)) {
            console.log("Erro: Formato de data inválido. Use DD/MM/AAAA.");
            return;
        }

        // Validar formato das horas (HHMM)
        const horaRegex = /^\d{4}$/;
        if (!horaRegex.test(horaInicial) || !horaRegex.test(horaFinal)) {
            console.log("Erro: Formato de hora inválido. Use HHMM.");
            return;
        }

        // Obter data e hora atuais
        const currentDate = new Date();
        const currentDateString = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;

        // Converter data e hora para objetos Date para comparação
        const consultaDate = new Date(data);
        const consultaStartTime = new Date(`${data} ${horaInicial.slice(0, 2)}:${horaInicial.slice(2)}:00`);
        const consultaEndTime = new Date(`${data} ${horaFinal.slice(0, 2)}:${horaFinal.slice(2)}:00`);

        // Validar se a data é futura e se a hora inicial é maior que a atual
        if (consultaDate < currentDate || (consultaDate.getTime() === currentDate.getTime() && consultaStartTime <= currentDate)) {
            console.log("Erro: A data e hora da consulta devem ser futuras.");
            return;
        }

        // Validar se a hora final é maior que a hora inicial
        if (consultaStartTime >= consultaEndTime) {
            console.log("Erro: A hora final deve ser maior que a hora inicial.");
            return;
        }

        // Validar se o paciente já possui uma consulta futura agendada
        const consultaFutura = paciente.consultas.find(consulta => {
            const consultaDate = new Date(consulta.data);
            return consultaDate > currentDate;
        });
        if (consultaFutura) {
            console.log("Erro: O paciente já possui uma consulta futura agendada.");
            return;
        }

        // Verificar se o paciente já possui uma consulta agendada para o período especificado
        const consultaExistente = paciente.consultas.find(consulta => {
            const consultaStartTime = new Date(`${consulta.data} ${consulta.horaInicial.slice(0, 2)}:${consulta.horaInicial.slice(2)}:00`);
            const consultaEndTime = new Date(`${consulta.data} ${consulta.horaFinal.slice(0, 2)}:${consulta.horaFinal.slice(2)}:00`);
            return consultaDate.getTime() === consultaStartTime.getTime() && consultaStartTime <= consultaStartTime && consultaEndTime >= consultaEndTime;
        });
        if (consultaExistente) {
            console.log("Erro: O paciente já possui uma consulta agendada para este período.");
            return;
        }

        // Validar se as horas estão no formato de 15 em 15 minutos
        if (parseInt(horaInicial.slice(2)) % 15 !== 0 || parseInt(horaFinal.slice(2)) % 15 !== 0) {
            console.log("Erro: As horas devem ser em intervalos de 15 minutos.");
            return;
        }

        // Validar se o horário de funcionamento do consultório é respeitado
        const horarioAbertura = new Date(`${data} 08:00:00`);
        const horarioFechamento = new Date(`${data} 19:00:00`);
        if (consultaStartTime < horarioAbertura || consultaEndTime > horarioFechamento) {
            console.log("Erro: A consulta deve estar dentro do horário de funcionamento (08:00h - 19:00h).");
            return;
        }

        // Criar a consulta e adicionar ao controller
        const consulta = new Consulta(paciente, data, horaInicial, horaFinal);
        this.consultas.push(consulta);
        paciente.consultas.push(consulta);
        console.log("Consulta agendada com sucesso.");
    }

    cancelarConsulta(pacienteCPF, data, horaInicial) {
        this.consultas = this.consultas.filter(consulta => !(consulta.paciente.cpf === pacienteCPF && consulta.data === data && consulta.horaInicial === horaInicial));
        const paciente = this.buscarPacientePorCPF(pacienteCPF);
        if (paciente) {
            paciente.consultas = paciente.consultas.filter(consulta => !(consulta.data === data && consulta.horaInicial === horaInicial));
        }
        console.log("Consulta cancelada com sucesso.");
    }
}

export default ConsultaController;

let consultaController = new ConsultaController();

// Criação da Agenda
let agenda = new Agenda(consultaController);

// Adicionar pacientes e agendar consultas
agenda.agendarConsultaComNovoPaciente("João", "12345678901", 30, "18/03/2024", "0900", "1000");
agenda.agendarConsultaComNovoPaciente("Maria", "98765432101", 25, "20/03/2024", "1430", "1530");

// Mostrar consultas agendadas
agenda.mostrarConsultas();

// Cancelar uma consulta
agenda.cancelarConsulta("12345678901", "18/03/2024", "0900");

// Mostrar consultas após cancelamento
agenda.mostrarConsultas();
