import CurrencyController from './controller/CurrencyController';

async function main() {
    const controller = new CurrencyController('aca31cd88e75552d3c7fe3f6');
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Moeda origem (por exemplo USD): ', async (fromCurrency: string) => {
        readline.question('Moeda destino (por exemplo EUR): ', async (toCurrency: string) => {
            readline.question('Valor a ser convertido: ', async (amountInput: string) => {
                const amount = parseFloat(amountInput);
                
                const result = await controller.handleConversion(fromCurrency, toCurrency, amount);
                
                if (typeof result === 'string') {
                    console.error(result);
                } else {
                    console.log(`${amount} ${fromCurrency} => ${result.convertedAmount} ${toCurrency}`);
                    console.log(`Taxa: ${result.exchangeRate}`);
                }

                readline.close();
            });
        });
    });
}

main();
