import ConversorDeMoedas from '../model/ConversorDeMoedas.ts';

export default class ControladorDeMoedas {
    private conversor: ConversorDeMoedas;

    constructor(chaveAPI: string) {
        this.conversor = new ConversorDeMoedas(chaveAPI);
    }

    async lidarComConversao(moedaOrigem: string, moedaDestino: string, valor: number): Promise<{ valorConvertido: number, taxaDeCambio: number } | string> {
        return await this.conversor.converterMoeda(moedaOrigem.toUpperCase(), moedaDestino.toUpperCase(), valor);
    }
}
