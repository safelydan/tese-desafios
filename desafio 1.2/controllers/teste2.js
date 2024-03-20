import inquirer from 'inquirer';
import Consulta from '../models/Consulta.js';

class ConsultaController {
    constructor() {
        this.consultas = [];
    }

    async agendarConsultaInterativa() {
        const dadosConsulta = await this.obterDadosConsulta();
        const consulta = new Consulta(dadosConsulta.paciente, dadosConsulta.data, dadosConsulta.horaInicial, dadosConsulta.horaFinal);
        console.log("Dados da consulta:", dadosConsulta); // Adicionando console.log para exibir os dados de entrada
    
        // Verificações
        if (!this.validarFormatoCPF(dadosConsulta.paciente)) {
            console.log("Erro: Formato de CPF inválido.");
            return;
        }

        if (!this.validarFormatoData(dadosConsulta.data)) {
            console.log("Erro: Formato de data inválido. Use DD/MM/AAAA.");
            return;
        }

        if (!this.validarFormatoHora(dadosConsulta.horaInicial) || !this.validarFormatoHora(dadosConsulta.horaFinal)) {
            console.log("Erro: Formato de hora inválido. Use HHMM.");
            return;
        }

        if (!this.validarDataFutura(dadosConsulta.data)) {
            console.log("Erro: A data da consulta deve ser no futuro.");
            return;
        }

        if (!this.validarHoraInicialAtual(dadosConsulta.data, dadosConsulta.horaInicial)) {
            console.log("Erro: A hora inicial da consulta deve ser maior que a hora atual.");
            return;
        }

        if (!this.validarHoraFinalMaior(dadosConsulta.horaInicial, dadosConsulta.horaFinal)) {
            console.log("Erro: A hora final deve ser maior que a hora inicial.");
            return;
        }

        if (this.pacientePossuiConsultaFutura(dadosConsulta.paciente)) {
            console.log("Erro: O paciente já possui uma consulta futura agendada.");
            return;
        }

        if (this.existeConsultaSobreposta(consulta)) {
            console.log("Erro: Já existe uma consulta agendada para este período.");
            return;
        }

        if (!this.validarIntervalo15Minutos(dadosConsulta.horaInicial, dadosConsulta.horaFinal)) {
            console.log("Erro: As horas devem ser em intervalos de 15 minutos.");
            return;
        }

        if (!this.validarHorarioFuncionamento(dadosConsulta.data, dadosConsulta.horaInicial, dadosConsulta.horaFinal)) {
            console.log("Erro: A consulta deve estar dentro do horário de funcionamento (08:00h - 19:00h).");
            return;
        }

        this.consultas.push(consulta);
        console.log("Consulta agendada com sucesso.");
    }

    async obterDadosConsulta() {
        const perguntas = [
            {
                type: 'input',
                name: 'paciente',
                message: 'CPF do paciente:'
            },
            {
                type: 'input',
                name: 'data',
                message: 'Data da consulta (DD/MM/AAAA):'
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

        const respostas = await inquirer.prompt(perguntas);
        return respostas;
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

    
        // Dividir a string da data em dia, mês e ano
        const [dia, mes, ano] = data.split('/');
    
        // Criar uma nova string no formato AAAA-MM-DD
        const dataFormatada = `${ano}-${mes}-${dia}`;

    
        // Criar o objeto Date com a data formatada
        const consultaDate = new Date(dataFormatada);

        return consultaDate.getTime() > currentDate.getTime();
    }
    
    

    validarHoraInicialAtual(data, horaInicial) {
        const currentDate = new Date();

        
        const [dia, mes, ano] = data.split('/');
        const dataFormatada = `${ano}-${mes}-${dia}`;

        
        const consultaDate = new Date(dataFormatada);

        
        const consultaStartTime = new Date(`${dataFormatada}T${horaInicial.slice(0, 2)}:${horaInicial.slice(2)}:00`);
        
        if (isNaN(consultaDate.getTime())) {
            console.log("Data da consulta inválida.");
            return false;
        }
        
        if (consultaDate.getTime() > currentDate.getTime()) {
            console.log("A data da consulta está no futuro.");
            return true;
        } else if (consultaDate.getTime() === currentDate.getTime()) {
            console.log("A data da consulta é igual à data atual.");
            if (consultaStartTime.getTime() > currentDate.getTime()) {
                console.log("A hora de início da consulta está no futuro.");
                return true;
            } else {
                console.log("A hora de início da consulta está no passado.");
                return false;
            }
        } else {
            console.log("A data da consulta está no passado.");
            return false;
        }
    }
    
    validarHoraFinalMaior(horaInicial, horaFinal) {
        return parseInt(horaFinal) > parseInt(horaInicial);
    }
    

    pacientePossuiConsultaFutura(paciente) {
        const pacienteConsulta = this.consultas.find(consulta => consulta.paciente === paciente);
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
        // Verificar se os horários de abertura e fechamento estão no formato correto
        if (!this.validarFormatoData(data)) {
            console.log("Erro: Formato de data inválido. Use DD/MM/AAAA.");
            return false;
        }
    
        // Verificar se os horários de abertura e fechamento estão no formato correto
        if (!this.validarFormatoHora(horaInicial) || !this.validarFormatoHora(horaFinal)) {
            console.log("Erro: Formato de hora inválido. Use HHMM.");
            return false;
        }
    
        console.log("Data:", data); // Verificar o formato da data aqui
    
        // Dividir a data em dia, mês e ano
        const [dia, mes, ano] = data.split('/');
        
        // Criar objetos Date para a data, hora de abertura e hora de fechamento
        const dataFormatada = new Date(`${ano}-${mes}-${dia}`);
        const horarioAbertura = new Date(dataFormatada);
        horarioAbertura.setHours(8, 0, 0); // Define a hora de abertura para 08:00:00
        const horarioFechamento = new Date(dataFormatada);
        horarioFechamento.setHours(19, 0, 0); // Define a hora de fechamento para 19:00:00
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
    
            // Verificar se a consulta existe
            const consultaIndex = this.consultas.findIndex(consulta => {
                return consulta.paciente === dadosCancelamento.paciente &&
                       consulta.data === dadosCancelamento.data &&
                       consulta.horaInicial === dadosCancelamento.horaInicial;
            });
    
            if (consultaIndex === -1) {
                console.log("Erro: Consulta não encontrada para cancelamento.");
                return;
            }
    
            // Verificar se a consulta é no futuro
            const consulta = this.consultas[consultaIndex];
            const consultaDate = new Date(`${consulta.data} ${consulta.horaInicial.slice(0, 2)}:${consulta.horaInicial.slice(2)}:00`);
            const currentDate = new Date();
            if (consultaDate < currentDate) {
                console.log("Erro: Só é possível cancelar uma consulta futura.");
                return;
            }
    
            // Remover consulta
            this.consultas.splice(consultaIndex, 1);
            console.log("Consulta cancelada com sucesso.");
        }
    
        async obterDadosCancelamento() {
            const perguntas = [
                {
                    type: 'input',
                    name: 'paciente',
                    message: 'CPF do paciente:'
                },
                {
                    type: 'input',
                    name: 'data',
                    message: 'Data da consulta (DD/MM/AAAA):'
                },
                {
                    type: 'input',
                    name: 'horaInicial',
                    message: 'Hora inicial da consulta (HHMM):'
                }
            ];
    
            const respostas = await inquirer.prompt(perguntas);
            return respostas;
            
        }

        
}
    
    


export default ConsultaController;