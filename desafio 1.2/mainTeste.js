// import Agenda from "./Agenda.js";
// import CadastroPaciente from "./CadastroPaciente.js";
// import Consulta from "./Consulta.js";
import inquirer from "inquirer";
import Paciente from "./Paciente.js";

const perguntas = [
    {
        type: 'input',
        name: 'nome',
        message: 'Qual o nome do paciente? '
    },
    {
        type: 'input',
        name: 'cpf',
        message: 'Qual o CPF do paciente? '
    },
    {
        type: 'input',
        name: 'dataNascimento',
        message: 'Qual a data de nascimento do paciente? (Formato: DD/MM/AAAA) '
    }
]

function formatarCPF(cpf) {
    // aplica a formatação com os traços e o hífen
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatarDataNasc(dataNascimento){
    return dataNascimento.replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$1/$2/$3");
}



async function cadastrarPaciente(){
    try{
        const respostas = await inquirer.prompt(perguntas);
    
        const cpfFormatado = formatarCPF(respostas.cpf)
        const novoPaciente = new Paciente(respostas.nome, respostas.cpf, respostas.dataNascimento)

        if (!novoPaciente.validarNome()) {
            console.log("Erro: Nome inválido.");
            return;
        }

        if (!novoPaciente.validarCPF()) {
            console.log("Erro: CPF inválido.");
            return;
        }

        if (!novoPaciente.validarDataNascimento()) {
            console.log("Erro: Data de nascimento inválida.");
            return;
        }
    
        console.log(`
--------------------------------------------------------------------
CPF             Nome            Dt. Nasc:    Idade    
--------------------------------------------------------------------
${cpfFormatado}  ${novoPaciente.nome.charAt(0).toUpperCase() + novoPaciente.nome.slice(1)}          ${novoPaciente.dataNascimento}     ${novoPaciente.calcularIdade()}`)
    }catch(error){
console.log(`Erro ao cadastrar o paciente. ${error}`)
    }

}


cadastrarPaciente()