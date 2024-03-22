import inquirer from 'inquirer';
import ConsultaController from './ConsultaController.js';

class Agenda {
    constructor() {
        this.consultaController = new ConsultaController();
    }

    async iniciar() {
        while (true) {
            console.log("\n=== Menu ===");

            const { opcao } = await inquirer.prompt({
                type: 'list',
                name: 'opcao',
                message: 'Escolha uma opção:',
                choices: [
                    { name: 'Agendar consulta', value: '1' },
                    { name: 'Cancelar consulta', value: '2' },
                    { name: 'Listar agenda', value: '3' }, 
                    { name: 'Voltar p/ menu principal', value: '4' }
                ]
            });

            switch (opcao) {
                case '1':
                    await this.consultaController.agendarConsultaInterativa();
                    break;
                case '2':
                    await this.consultaController.cancelarConsultaInterativa();
                    break;
                case '3':
                    this.consultaController.listarConsultas(); 
                    break;
                case '4':
                    console.log("Saindo...");
                    return;
                default:
                    console.log("Opção inválida.");
            }
        }
    }
}

const agenda = new Agenda();
agenda.iniciar();

export default Agenda;