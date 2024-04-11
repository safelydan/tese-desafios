"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var CurrencyConverter = /** @class */ (function () {
    function CurrencyConverter(apiKey) {
        this.apiKey = apiKey;
    }
    CurrencyConverter.prototype.convertCurrency = function (fromCurrency, toCurrency, amount) {
        return __awaiter(this, void 0, void 0, function () {
            var response, data, exchangeRate, convertedAmount, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        // Verifica se as moedas de origem e destino são válidas
                        if (fromCurrency.length !== 3 || toCurrency.length !== 3) {
                            throw new Error('As moedas de origem e destino devem ter exatamente 3 caracteres.');
                        }
                        // Verifica se o valor de entrada é válido
                        if (amount <= 0) {
                            throw new Error('O valor de entrada deve ser maior que zero.');
                        }
                        return [4 /*yield*/, axios_1.default.get("https://v6.exchangerate-api.com/v6/".concat(this.apiKey, "/pair/").concat(fromCurrency, "/").concat(toCurrency))];
                    case 1:
                        response = _a.sent();
                        // Verifica se a chamada foi bem sucedida
                        if (response.status !== 200) {
                            throw new Error('Erro na comunicação com a API.');
                        }
                        data = response.data;
                        // Verifica se houve algum erro na resposta da API
                        if (data.result !== 'success') {
                            throw new Error("Erro na convers\u00E3o: ".concat(data['error-type']));
                        }
                        exchangeRate = parseFloat(data.conversion_rate);
                        convertedAmount = amount * exchangeRate;
                        return [2 /*return*/, {
                                convertedAmount: parseFloat(convertedAmount.toFixed(2)),
                                exchangeRate: parseFloat(exchangeRate.toFixed(6))
                            }];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1.message];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CurrencyConverter;
}());
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var converter, readline;
        var _this = this;
        return __generator(this, function (_a) {
            converter = new CurrencyConverter('aca31cd88e75552d3c7fe3f6');
            readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });
            readline.question('Moeda origem (por exemplo USD): ', function (fromCurrency) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    readline.question('Moeda destino (por exemplo EUR): ', function (toCurrency) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            readline.question('Valor a ser convertido: ', function (amountInput) { return __awaiter(_this, void 0, void 0, function () {
                                var amount, result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            amount = parseFloat(amountInput);
                                            return [4 /*yield*/, converter.convertCurrency(fromCurrency.toUpperCase(), toCurrency.toUpperCase(), amount)];
                                        case 1:
                                            result = _a.sent();
                                            if (typeof result === 'string') {
                                                console.error(result);
                                            }
                                            else {
                                                console.log("".concat(amount, " ").concat(fromCurrency, " => ").concat(result.convertedAmount, " ").concat(toCurrency));
                                                console.log("Taxa: ".concat(result.exchangeRate));
                                            }
                                            readline.close();
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
                });
            }); });
            return [2 /*return*/];
        });
    });
}
main();
