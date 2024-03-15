export default class Agenda {
  constructor() {
    this.consultas = [];
  }

  agendarConsulta(consulta) {}

  cancelarConsulta(paciente, data, horaInicial) {
    if (paciente(consultas.length > 0)) {
      return false && `O paciente tem uma ou mais consultas agendadas`;
    }
  }

  listarAgenda(dataInicial, dataFinal) {}
}
