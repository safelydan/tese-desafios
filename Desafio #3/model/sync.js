import sequelize from '../db.js';
import Paciente from './paciente.js';
import Consulta from './consulta.js';

sequelize.sync().then(() => {
  console.log("Modelos sincronizados com o banco de dados!");
});

export { Paciente, Consulta };
