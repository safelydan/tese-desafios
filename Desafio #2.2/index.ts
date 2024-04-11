import axios from 'axios';

class CurrencyConverter {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async convertCurrency(fromCurrency: string, toCurrency: string, amount: number): Promise<{ convertedAmount: number, exchangeRate: number } | string> {
        try {
            // Verifica se as moedas de origem e destino são válidas
            if (fromCurrency.length !== 3 || toCurrency.length !== 3) {
                throw new Error('As moedas de origem e destino devem ter exatamente 3 caracteres.');
            }

            // Verifica se o valor de entrada é válido
            if (amount <= 0) {
                throw new Error('O valor de entrada deve ser maior que zero.');
            }

            // Realiza a chamada para a API de conversão de moedas
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${fromCurrency}/${toCurrency}`);

            // Verifica se a chamada foi bem sucedida
            if (response.status !== 200) {
                throw new Error('Erro na comunicação com a API.');
            }

            const data = response.data;

            // Verifica se houve algum erro na resposta da API
            if (data.result !== 'success') {
                throw new Error(`Erro na conversão: ${data['error-type']}`);
            }

            const exchangeRate = parseFloat(data.conversion_rate);
            const convertedAmount = amount * exchangeRate;

            return {
                convertedAmount: parseFloat(convertedAmount.toFixed(2)),
                exchangeRate: parseFloat(exchangeRate.toFixed(6))
            };
        } catch (error: any) {
            return error.message;
        }
    }
}

async function main() {
    const converter = new CurrencyConverter('aca31cd88e75552d3c7fe3f6');
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    readline.question('Moeda origem (por exemplo USD): ', async (fromCurrency) => {
        readline.question('Moeda destino (por exemplo EUR): ', async (toCurrency) => {
            readline.question('Valor a ser convertido: ', async (amountInput) => {
                const amount = parseFloat(amountInput);
                
                const result = await converter.convertCurrency(fromCurrency.toUpperCase(), toCurrency.toUpperCase(), amount);
                
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
