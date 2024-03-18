import CadastroPaciente from "../controllers/CadastroPaciente.js";
import Paciente from "../models/Paciente.js";


// Criando uma instância de CadastroPaciente
const cadastro = new CadastroPaciente();

// Adicionando alguns pacientes para teste
cadastro.adicionarPaciente(new Paciente("João", "12345678901", "01/01/1990"));
cadastro.adicionarPaciente(new Paciente("Maria", "98765432109", "15/06/1985"));

// Mostrando os pacientes presentes na lista
console.log("Pacientes cadastrados:");
cadastro.pacientes.forEach((paciente, index) => {
    console.log(`${index + 1}. Nome: ${paciente.nome}, CPF: ${paciente.cpf}, Data de Nascimento: ${paciente.dataNascimento}`);
});
