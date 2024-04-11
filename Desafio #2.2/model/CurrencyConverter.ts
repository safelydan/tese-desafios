import axios from 'axios';

export default class CurrencyConverter {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async convertCurrency(fromCurrency: string, toCurrency: string, amount: number): Promise<{ convertedAmount: number, exchangeRate: number } | string> {
        try {
            // verifica se as moedas de origem e destino são válidas
            if (fromCurrency.length !== 3 || toCurrency.length !== 3) {
                throw new Error('As moedas de origem e destino devem ter exatamente 3 caracteres.');
            }

            // verifica se o valor de entrada é válido
            if (amount <= 0) {
                throw new Error('O valor de entrada deve ser maior que zero.');
            }

            // realiza a chamada para a API de conversão de moedas
            const response = await axios.get(`https://v6.exchangerate-api.com/v6/${this.apiKey}/pair/${fromCurrency}/${toCurrency}`);

            // verifica se a chamada foi bem sucedida
            if (response.status !== 200) {
                throw new Error('Erro na comunicação com a API.');
            }

            const data = response.data;

            // verifica se houve algum erro na resposta da API
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
