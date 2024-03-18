import Paciente from "../models/Paciente.js";
import Consulta from "../models/Consulta.js";

class ConsultaController {
    constructor() {
        this.pacientes = [];
        this.consultas = [];
    }

    adicionarPaciente(paciente) {
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
            console.log("Paciente não encontrado.");
            return;
        }
    
        const consulta = new Consulta(paciente, data, horaInicial, horaFinal);
    
        if (consulta instanceof Consulta) {
            this.consultas.push(consulta);
            if (!paciente.consultas) {
                paciente.consultas = []; 
            }
            paciente.consultas.push(consulta);
            console.log("Consulta agendada com sucesso.");
        } else {
            console.log("Apenas instâncias da classe Consulta podem ser adicionadas.");
        }
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

let consultaController = new ConsultaController();

let paciente1 = new Paciente("João", 30);
let paciente2 = new Paciente("Maria", 25);

consultaController.adicionarPaciente(paciente1);
consultaController.adicionarPaciente(paciente2);

consultaController.agendarConsulta(paciente1.cpf, "2024-03-18", "09:00", "10:00");
consultaController.agendarConsulta(paciente2.cpf, "2024-03-20", "14:30", "15:30");


consultaController.cancelarConsulta(paciente1.cpf, "2024-03-18", "09:00");
