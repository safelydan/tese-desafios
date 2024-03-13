export default class Paciente {
    constructor(nome, cpf, dataNascimento) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }

    validarCPF(cpf) {
        return /^\d{11}$/.test(cpf);

    }

    validarNome(nome){
        if(nome.length <= 4){
            console.log("o nome deve ter ao menos 5 caracteres")
        }
    }

      
    validarDataNascimento(dataNascimento) {
        const data = new Date(dataNascimento);
        const hoje = new Date();
        return (hoje - data) / (365.25 * 24 * 60 * 60 * 1000) >= 18;
      }
}
