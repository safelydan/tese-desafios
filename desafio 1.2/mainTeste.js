// import Agenda from "./Agenda.js";
// import CadastroPaciente from "./CadastroPaciente.js";
// import Consulta from "./Consulta.js";
import inquirer from "inquirer";
import Paciente from "./Paciente.js";


function formatarCPF(cpf) {
    // aplica a formatação com os traços e o hífen
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
function adicionarPaciente(){inquirer.prompt([{
    type: "input",
    
}])

}
const paciente = new Paciente("Daniel", "12345678910", "02/08/2001")
console.log(`Paciente: ${paciente.nome}
CPF: ${formatarCPF(paciente.cpf)}
Data De Nascimento: ${paciente.dataNascimento}`)