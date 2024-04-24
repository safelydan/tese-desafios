import sequelize from '../db.js';
import { DataTypes, Model } from 'sequelize';

class Paciente extends Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: DataTypes.STRING,
      cpf: DataTypes.STRING,
      dataNascimento: DataTypes.DATEONLY
    }, {
      sequelize,
      modelName: 'Paciente'
    });
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

  calcularIdade() {
    const dataNascimento = new Date(this.dataNascimento);
    const hoje = new Date();
    const diferencaMilissegundos = hoje.getTime() - dataNascimento.getTime();
    return diferencaMilissegundos / (1000 * 60 * 60 * 24 * 365.25);
  }

  validarDataNascimento() {
    const idade = this.calcularIdade();
    return idade >= 18;
  }

  validarIdadeMinima(idadeMinima) {
    const idade = this.calcularIdade();
    return idade >= idadeMinima;
  }
}

Paciente.init(sequelize);

sequelize.options.define = {
  timestamps: true,
  charset: 'utf8',
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: '-03:00' }
};

export default Paciente;
