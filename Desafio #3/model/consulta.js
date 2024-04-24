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
        data: DataTypes.DATEONLY,
        horaInicial: DataTypes.TIME,
        horaFinal: DataTypes.TIME,
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
