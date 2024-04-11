import ControladorDeMoedas from './controller/ControladorDeMoedas.ts'

async function principal() {
    const controlador = new ControladorDeMoedas('aca31cd88e75552d3c7fe3f6');
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Moeda origem (por exemplo USD): ', async (moedaOrigem: string) => {
        readline.question('Moeda destino (por exemplo EUR): ', async (moedaDestino: string) => {
            readline.question('Valor a ser convertido: ', async (valorInput: string) => {
                const valor = parseFloat(valorInput);
                
                const resultado = await controlador.lidarComConversao(moedaOrigem, moedaDestino, valor);
                
                if (typeof resultado === 'string') {
                    console.error(resultado);
                } else {
                    console.log(`${valor} ${moedaOrigem} => ${resultado.valorConvertido} ${moedaDestino}`);
                    console.log(`Taxa: ${resultado.taxaDeCambio}`);
                }

                readline.close();
            });
        });
    });
}

principal();
