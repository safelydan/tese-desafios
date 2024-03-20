import inquirer from 'inquirer';
import ConsultaController from './teste2.js';

async function main() {
    const consultaController = new ConsultaController();

    while (true) {
        console.log("\n=== Menu ===");

        const { opcao } = await inquirer.prompt({
            type: 'list',
            name: 'opcao',
            message: 'Escolha uma opção:',
            choices: [
                { name: 'Agendar consulta', value: '1' },
                { name: 'Cancelar consulta', value: '2' },
                { name: 'Sair', value: '3' }
            ]
        });

        switch (opcao) {
            case '1':
                await consultaController.agendarConsultaInterativa();
                break;
            case '2':
                await consultaController.cancelarConsultaInterativa();
                break;
            case '3':
                console.log("Saindo...");
                return;
            default:
                console.log("Opção inválida.");
        }
    }
}

main();
