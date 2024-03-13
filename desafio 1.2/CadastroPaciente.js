export default class CadastroPaciente{
    constructor(){
        this.pacientes = []
    }

    adicionarPaciente(paciente){
        if(this.validarCPF(paciente.cpf) && this.validarNome(paciente.nome) && this.validarDataNascimento){
            this.pacientes.push(pacientes);
            return true;
        }else{
            return false;
        }
    }
    

    excluirPaciente(cpf){
        const index = this.pacientes.findIndex(paciente => paciente.cpf === cpf);
        if (index !== -1){
            this.pacientes.splice(index, 1);
            return true;
        }else{
            return false;
        }
    }

    listarPacientes(){

    }
}

