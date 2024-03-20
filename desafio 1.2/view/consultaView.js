import Paciente from "../models/Paciente.js";
import { cadastrarNovoPaciente } from "../controllers/CadastroPaciente.js"; // Importe a função corretamente

class Agenda {
    constructor(consultaController) {
        this.consultaController = consultaController;
    }

    agendarConsultaComNovoPaciente(nome, cpf, idade, data, horaInicial, horaFinal) {
        const paciente = new Paciente(nome, cpf, idade);
        cadastrarNovoPaciente(paciente); // Use a função diretamente
        this.consultaController.agendarConsulta(paciente.cpf, data, horaInicial, horaFinal);
    }
    
    cancelarConsulta(pacienteCPF, data, horaInicial) {
        this.consultaController.cancelarConsulta(pacienteCPF, data, horaInicial);
    }

    mostrarConsultas() {
        console.log("Consultas agendadas:");
        this.consultaController.consultas.forEach((consulta, index) => {
            console.log(`Consulta ${index + 1}:`);
            console.log(`Paciente: ${consulta.paciente.nome}`);
            console.log(`Data: ${consulta.data}`);
            console.log(`Hora inicial: ${consulta.horaInicial}`);
            console.log(`Hora final: ${consulta.horaFinal}`);
            console.log("------------");
        });
    }
}

export default Agenda;
