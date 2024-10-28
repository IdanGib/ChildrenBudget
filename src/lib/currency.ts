import { data, CurrencyCodeRecord } from 'currency-codes';
export type CurrencyData = CurrencyCodeRecord;
export class Currency {
    static readonly currenciesCodes = data.map(({ code }) => code);
    
    static isCurrency(value: string): boolean {
        return this.currenciesCodes.some(code => code.toLowerCase() === value.toLowerCase());
    }

    static listCurrencies(): CurrencyData[] {
        return data;
    }
}