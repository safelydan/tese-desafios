export default class Paciente {
    constructor(nome, cpf, dataNascimento) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }

    validarCPF() {
        return /^\d{11}$/.test(this.cpf);
    }

    validarNome() {
        if (this.nome.length <= 4) {
            console.log("O nome deve ter ao menos 5 caracteres");
            return false;
        }
        return true;
    }

    validarDataNascimento() {
        const dataNascimento = new Date(this.dataNascimento);
        const hoje = new Date();
        const diferencaMilissegundos = hoje.getTime() - dataNascimento.getTime();
        const idade = diferencaMilissegundos / (1000 * 60 * 60 * 24 * 365.25);
        return idade >= 18;
    }

    calcularIdade() {
        const dataNascimento = new Date(this.dataNascimento);
        const hoje = new Date();
        const diferencaMilissegundos = hoje.getTime() - dataNascimento.getTime();
        return Math.floor(diferencaMilissegundos / (1000 * 60 * 60 * 24 * 365.25));
    }
    
}
