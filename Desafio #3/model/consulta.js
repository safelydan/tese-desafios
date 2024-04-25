import sequelize from "../db.js";
import { DataTypes, Model } from "sequelize";
import Paciente from "./paciente.js";

export class Consulta extends Model {
  static init(sequelize) {
    return super.init(
      {
        PacienteId: {
          type: DataTypes.INTEGER, 
          allowNull: false,
        },
        data: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          validate: {
            isFutureDate(value) {
              if (value < new Date()) {
                throw new Error('A data da consulta deve ser futura.');
              }
            }
          }
        },
        horaInicial: {
          type: DataTypes.TIME,
          allowNull: false,
          validate: {
            isHourFormat(value) {
              if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value)) {
                throw new Error('Formato de hora inválido. Use o formato HH:MM.');
              }
            }
          }
        },
        horaFinal: {
          type: DataTypes.TIME,
          allowNull: false,
          validate: {
            isHourFormat(value) {
              if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(value)) {
                throw new Error('Formato de hora inválido. Use o formato HH:MM.');
              }
            },
            isGreaterThanInitial(value) {
              if (value <= this.horaInicial) {
                throw new Error('A hora final deve ser maior que a hora inicial.');
              }
            }
          }
        },
      },
      {
        sequelize,
        modelName: "Consulta",
      }
    );
  }

  
}

Consulta.init(sequelize);

Paciente.hasMany(Consulta);
Consulta.belongsTo(Paciente);

sequelize.options.define = {
  timestamps: true,
  charset: "utf8",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: "-03:00",
  },
};

export default Consulta;
