import axios from 'axios';

export default class ConversorDeMoedas {
    private chaveAPI: string;

    constructor(chaveAPI: string) {
        this.chaveAPI = chaveAPI;
    }

    async converterMoeda(moedaOrigem: string, moedaDestino: string, valor: number): Promise<{ valorConvertido: number, taxaDeCambio: number } | string> {
        try {
            if (moedaOrigem.length !== 3 || moedaDestino.length !== 3) {
                throw new Error('As moedas de origem e destino devem ter exatamente 3 caracteres.');
            }

            if (valor <= 0) {
                throw new Error('O valor de entrada deve ser maior que zero.');
            }

            const resposta = await axios.get(`https://v6.exchangerate-api.com/v6/${this.chaveAPI}/pair/${moedaOrigem}/${moedaDestino}`);

            if (resposta.status !== 200) {
                throw new Error('Erro na comunicação com a API.');
            }

            const dados = resposta.data;

            if (dados.result !== 'success') {
                throw new Error(`Erro na conversão: ${dados['error-type']}`);
            }

            const taxaDeCambio = parseFloat(dados.conversion_rate);
            const valorConvertido = valor * taxaDeCambio;

            return {
                valorConvertido: parseFloat(valorConvertido.toFixed(2)),
                taxaDeCambio: parseFloat(taxaDeCambio.toFixed(6))
            };
        } catch (error: any) {
            return error.message;
        }
    }
}
