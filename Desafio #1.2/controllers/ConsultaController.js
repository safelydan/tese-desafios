import inquirer from 'inquirer';
import Consulta from '../models/Consulta.js';
import Paciente from '../models/Paciente.js';

class ConsultaController {
    constructor() {
        this.consultas = [];
        this.pacientes = [];
    }

    async agendarConsultaInterativa() {
        const paciente = await this.obterPaciente(); // Obtenha os dados do paciente

        if (!paciente) {
            console.log("Erro: Paciente não encontrado.");
            return;
        }

        const dadosConsulta = await this.obterDadosConsulta();
        const consulta = new Consulta(paciente.cpf, dadosConsulta.data, dadosConsulta.horaInicial, dadosConsulta.horaFinal);

        if (!this.validarConsulta(consulta)) {
            return;
        }

        this.consultas.push(consulta);
        console.log("Consulta agendada com sucesso para o paciente:", paciente.nome);
    }
    
    async obterPaciente() {
        const respostas = await inquirer.prompt([
            { type: 'input', name: 'cpf', message: 'Digite o CPF do paciente:' }
        ]);
    
        const pacienteExistente = this.pacientes.find(p => p.cpf === respostas.cpf);
    
        if (pacienteExistente) {
            return pacienteExistente; // Retorna o paciente existente se encontrado
        } else {
            // Se o paciente não existe, crie um novo paciente e adicione à lista de pacientes
            const paciente = new Paciente(respostas.nome, respostas.cpf);
            this.pacientes.push(paciente);
            return paciente;
        }
    }
    

    

    async obterDadosConsulta() {
        const perguntas = [
            { type: 'input', name: 'data', message: 'Data da consulta (DD/MM/AAAA):' },
            { type: 'input', name: 'horaInicial', message: 'Hora inicial da consulta (HHMM):' },
            { type: 'input', name: 'horaFinal', message: 'Hora final da consulta (HHMM):' }
        ];
        return await inquirer.prompt(perguntas);
    }

    validarConsulta(consulta) {
        const { cpf, data, horaInicial, horaFinal } = consulta;


        if (!this.validarFormatoData(data)) {
            console.log("Erro: Formato de data inválido. Use DD/MM/AAAA.");
            return false;
        }

        if (!this.validarFormatoHora(horaInicial) || !this.validarFormatoHora(horaFinal)) {
            console.log("Erro: Formato de hora inválido. Use HHMM.");
            return false;
        }

        if (!this.validarDataFutura(data)) {
            return false;
        }

        if (!this.validarHoraInicialAtual(data, horaInicial)) {
            console.log("Erro: A hora inicial da consulta deve ser maior que a hora atual.");
            return false;
        }

        if (!this.validarHoraFinalMaior(horaInicial, horaFinal)) {
            console.log("Erro: A hora final deve ser maior que a hora inicial.");
            return false;
        }

        if (this.pacientePossuiConsultaFutura(cpf)) {
            console.log("Erro: O paciente já possui uma consulta futura agendada.");
            return false;
        }

        if (this.existeConsultaSobreposta(consulta)) {
            console.log("Erro: Já existe uma consulta agendada para este período.");
            return false;
        }

        if (!this.validarIntervalo15Minutos(horaInicial, horaFinal)) {
            console.log("Erro: As horas devem ser em intervalos de 15 minutos.");
            return false;
        }

        if (!this.validarHorarioFuncionamento(data, horaInicial, horaFinal)) {
            console.log("Erro: A consulta deve estar dentro do horário de funcionamento (08:00h - 19:00h).");
            return false;
        }

        return true;
    }

    validarFormatoCPF(cpf) {
        const cpfRegex = /^\d{11}$/;
        return cpfRegex.test(cpf);
    }

    validarFormatoData(data) {
        const dataRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        return dataRegex.test(data);
    }

    validarFormatoHora(hora) {
        const horaRegex = /^\d{4}$/;
        return horaRegex.test(hora);
    }

    validarDataFutura(data) {
        const currentDate = new Date();

        const [dia, mes, ano] = data.split('/');
        const dataFormatada = `${ano}-${mes}-${dia}`;
        const consultaDate = new Date(dataFormatada);

        return consultaDate.getTime() > currentDate.getTime();
    }

    validarHoraInicialAtual(data, horaInicial) {
        const currentDate = new Date();

        const [dia, mes, ano] = data.split('/');
        const dataFormatada = `${ano}-${mes}-${dia}`;

        const consultaDate = new Date(dataFormatada);
        const consultaStartTime = new Date(`${dataFormatada}T${horaInicial.slice(0, 2)}:${horaInicial.slice(2)}:00`);

        if (consultaDate.getTime() > currentDate.getTime()) {
            return true;
        } else if (consultaDate.getTime() === currentDate.getTime()) {
            return consultaStartTime.getTime() > currentDate.getTime();
        } else {
            return false;
        }
    }

    validarHoraFinalMaior(horaInicial, horaFinal) {
        return parseInt(horaFinal) > parseInt(horaInicial);
    }

    pacientePossuiConsultaFutura(cpf) {
        const pacienteConsulta = this.consultas.find(consulta => consulta.paciente === cpf);
        if (!pacienteConsulta) return false;
        const consultaDate = new Date(pacienteConsulta.data);
        const currentDate = new Date();
        return consultaDate.getTime() > currentDate.getTime();
    }

    existeConsultaSobreposta(novaConsulta) {
        const novaConsultaStartTime = new Date(`${novaConsulta.data} ${novaConsulta.horaInicial.slice(0, 2)}:${novaConsulta.horaInicial.slice(2)}:00`);
        const novaConsultaEndTime = new Date(`${novaConsulta.data} ${novaConsulta.horaFinal.slice(0, 2)}:${novaConsulta.horaFinal.slice(2)}:00`);
        return this.consultas.some(consulta => {
            const consultaStartTime = new Date(`${consulta.data} ${consulta.horaInicial.slice(0, 2)}:${consulta.horaInicial.slice(2)}:00`);
            const consultaEndTime = new Date(`${consulta.data} ${consulta.horaFinal.slice(0, 2)}:${consulta.horaFinal.slice(2)}:00`);
            return novaConsultaStartTime >= consultaStartTime && novaConsultaStartTime <= consultaEndTime || novaConsultaEndTime >= consultaStartTime && novaConsultaEndTime <= consultaEndTime;
        });
    }

    validarIntervalo15Minutos(horaInicial, horaFinal) {
        const horaInicioMinutos = parseInt(horaInicial.slice(2));
        const horaFimMinutos = parseInt(horaFinal.slice(2));
        return horaInicioMinutos % 15 === 0 && horaFimMinutos % 15 === 0;
    }

    validarHorarioFuncionamento(data, horaInicial, horaFinal) {
        const [dia, mes, ano] = data.split('/');
        const dataFormatada = new Date(`${ano}-${mes}-${dia}`);

        const horarioAbertura = new Date(dataFormatada);
        horarioAbertura.setHours(8, 0, 0);
        const horarioFechamento = new Date(dataFormatada);
        horarioFechamento.setHours(19, 0, 0);
        const consultaStartTime = new Date(dataFormatada);
        consultaStartTime.setHours(parseInt(horaInicial.slice(0, 2)), parseInt(horaInicial.slice(2)), 0);
        const consultaEndTime = new Date(dataFormatada);
        consultaEndTime.setHours(parseInt(horaFinal.slice(0, 2)), parseInt(horaFinal.slice(2)), 0);

        const dentroDoHorario = consultaStartTime >= horarioAbertura && consultaEndTime <= horarioFechamento;

        if (dentroDoHorario) {
            console.log("A consulta está dentro do horário de funcionamento.");
        } else {
            console.log("A consulta está fora do horário de funcionamento.");
        }

        return dentroDoHorario;
    }

    async cancelarConsultaInterativa() {
        const dadosCancelamento = await this.obterDadosCancelamento();

        const consultaIndex = this.consultas.findIndex(consulta => {
            return consulta.paciente === dadosCancelamento.paciente &&
                consulta.data === dadosCancelamento.data &&
                consulta.horaInicial === dadosCancelamento.horaInicial;
        });

        if (consultaIndex === -1) {
            console.log("Erro: Consulta não encontrada para cancelamento.");
            return;
        }

        const consulta = this.consultas[consultaIndex];
        const consultaDate = new Date(`${consulta.data} ${consulta.horaInicial.slice(0, 2)}:${consulta.horaInicial.slice(2)}:00`);
        const currentDate = new Date();
        if (consultaDate < currentDate) {
            console.log("Erro: Só é possível cancelar uma consulta futura.");
            return;
        }

        this.consultas.splice(consultaIndex, 1);
        console.log("Consulta cancelada com sucesso.");
    }

    async obterDadosCancelamento() {
        const perguntas = [
            { type: 'input', name: 'paciente', message: 'CPF do paciente:' },
            { type: 'input', name: 'data', message: 'Data da consulta (DD/MM/AAAA):' },
            { type: 'input', name: 'horaInicial', message: 'Hora inicial da consulta (HHMM):' }
        ];
        return await inquirer.prompt(perguntas);
    }

    listarConsultas() {
        if (this.consultas.length === 0) {
            console.log("Não há consultas agendadas.");
        } else {
            console.log("Consultas agendadas:");
            this.consultas.forEach((consulta, index) => {
                const paciente = this.pacientes.find(p => p.cpf === consulta.paciente);
                console.log(`Consulta ${index + 1}:`);
                console.log(`   Data           H.Ini    H.Fim    Nome 
${consulta.data}         ${consulta.horaInicial}     ${consulta.horaFinal}  ${paciente.nome}`);
            });
        }
    }
}

export default ConsultaController;

