import CurrencyConverter from '../model/CurrencyConverter';

export default class CurrencyController {
    private converter: CurrencyConverter;

    constructor(apiKey: string) {
        this.converter = new CurrencyConverter(apiKey);
    }

    async handleConversion(fromCurrency: string, toCurrency: string, amount: number): Promise<{ convertedAmount: number, exchangeRate: number } | string> {
        return await this.converter.convertCurrency(fromCurrency.toUpperCase(), toCurrency.toUpperCase(), amount);
    }
}
