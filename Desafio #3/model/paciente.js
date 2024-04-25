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
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validarNome(value) {
            if (value.length <= 4) {
              throw new Error("O nome deve ter ao menos 5 caracteres");
            }
          }
        }
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          validarCPF(value) {
            if (!/^\d{11}$/.test(value)) {
              throw new Error("CPF inválido. Por favor, digite corretamente");
            }
          }
        }
      },
      dataNascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          validarDataNascimento() {
            const dataNascimento = new Date(this.dataNascimento);
            const hoje = new Date();
            const diferencaMilissegundos = hoje.getTime() - dataNascimento.getTime();
            const idade = diferencaMilissegundos / (1000 * 60 * 60 * 24 * 365.25);
            if (idade < 18) {
              throw new Error("O paciente deve ter pelo menos 18 anos de idade.");
            }
          }
        }
      }
    }, {
      sequelize,
      modelName: 'Paciente'
    });
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
