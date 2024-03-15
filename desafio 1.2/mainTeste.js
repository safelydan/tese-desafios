import inquirer from "inquirer";
import Paciente from "./Paciente.js";

const perguntas = [
    {
        type: 'input',
        name: 'nome',
        message: 'Qual o nome do paciente? ',
        validate: function(value) {
            if (value.length < 5) {
                return "O nome do paciente deve ter pelo menos 5 caracteres.";
            }
            return true;
        }
    },
    {
        type: 'input',
        name: 'cpf',
        message: 'Qual o CPF do paciente? ',
        validate: function(value){
            const cpfValido = /^\d{11}$/.test(value)

            if(cpfValido){
                return true;
            }else{
                return `erro. digite novamente o cpf`
            }
        }
    },
    {
        type: 'input',
        name: 'dataNascimento',
        message: 'Qual a data de nascimento do paciente? (Formato: DD/MM/AAAA) ',
        validate: function(value){
            const dataValida = /^(\d{2})\/(\d{2})\/(\d{4})$/.test(value)

            if(dataValida){
                return true
            }else{
                return `data de nascimento invalidada`
            }
        }
    }
]

function formatarCPF(cpf) {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

async function cadastrarPaciente(){
    try {
        const respostas = await inquirer.prompt(perguntas);
        const novoPaciente = new Paciente(respostas.nome, respostas.cpf, respostas.dataNascimento);

        console.log(`
Paciente ${respostas.nome} cadastrado com sucesso.`)
        console.log(`
--------------------------------------------------------------------
CPF             Nome            Dt. Nasc:    Idade    
--------------------------------------------------------------------
${formatarCPF(respostas.cpf)}  ${respostas.nome.charAt(0).toUpperCase() + respostas.nome.slice(1)}          ${respostas.dataNascimento}     ${novoPaciente.calcularIdade()}`)
    } catch (error) {
        console.log(`Erro ao cadastrar o paciente. ${error}`);
    }
}

cadastrarPaciente();
