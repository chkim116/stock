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
        while (_) try {
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var puppeteer_1 = require("puppeteer");
var cheerio_1 = require("cheerio");
function getOrThrow(something) {
    if (!something) {
        throw new Error("something is falsy!");
    }
    return something;
}
var DividendScraper = /** @class */ (function () {
    function DividendScraper() {
        this._lastPage = 0;
        this._page = null;
        this._browser = null;
        this.scrapedData = [];
    }
    DividendScraper.prototype.prepare = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, puppeteer_1["default"].launch()];
                    case 1:
                        _a._browser = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this._browser.newPage()];
                    case 2:
                        _b._page = _c.sent();
                        this._lastPage = 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    DividendScraper.prototype.prepareDestroy = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ((_a = this._browser) === null || _a === void 0 ? void 0 : _a.close())];
                    case 1:
                        _b.sent();
                        this._browser = null;
                        this._page = null;
                        this._lastPage = 0;
                        return [2 /*return*/];
                }
            });
        });
    };
    DividendScraper.prototype.scrapeData = function (page) {
        return __awaiter(this, void 0, void 0, function () {
            var html, $;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, getOrThrow(this._page).goto("https://finance.naver.com/sise/dividend_list.naver?page=".concat(page))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, getOrThrow(this._page).content()];
                    case 2:
                        html = _a.sent();
                        $ = cheerio_1["default"].load(html);
                        // 스크랩할 데이터 선택자를 찾아서 처리합니다.
                        $("#contentarea_left > table.type_1.tb_ty > tbody").each(function (_, element) {
                            $(element)
                                .find("tr")
                                .each(function (_, element) {
                                var name = $(element).find("td:nth-child(1)").text();
                                if (/\s/.test(name)) {
                                    return;
                                }
                                var dividendData = {
                                    name: name,
                                    currentStock: $(element).find("td:nth-child(2)").text(),
                                    payoutMonth: $(element)
                                        .find("td:nth-child(3)")
                                        .text()
                                        .replace(/\s/g, ""),
                                    payoutRatio: $(element).find("td:nth-child(6)").text(),
                                    roe: $(element).find("td:nth-child(7)").text(),
                                    dividend: $(element).find("td:nth-child(4)").text(),
                                    year1: $(element).find("td:nth-child(10)").text(),
                                    year2: $(element).find("td:nth-child(11)").text(),
                                    year3: $(element).find("td:nth-child(12)").text()
                                };
                                _this.scrapedData.push(dividendData);
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    DividendScraper.prototype.getLastPage = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var html, $, last;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, getOrThrow(this._page).goto("https://finance.naver.com/sise/dividend_list.naver?page=1")];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, getOrThrow(this._page).content()];
                    case 2:
                        html = _b.sent();
                        $ = cheerio_1["default"].load(html);
                        try {
                            last = (_a = $(".pgRR > a").attr("href")) === null || _a === void 0 ? void 0 : _a.split("page=")[1];
                            this._lastPage = Number.isNaN(last) ? 0 : Number(last);
                        }
                        finally {
                            //
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // 3년전, 2년전, 1년전 배당금이 증가하거나 동일하고 배당성향률이 100% 이하인지 확인
    DividendScraper.prototype.filterData = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, data.filter(function (item) {
                        return (item.year3 <= item.year2 &&
                            item.year2 <= item.year1 &&
                            Number(item.payoutRatio) <= 100);
                    })];
            });
        });
    };
    DividendScraper.prototype.main = function () {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var pageList, pageList_1, pageList_1_1, page, e_1_1, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 17, , 18]);
                        this.prepareDestroy();
                        return [4 /*yield*/, this.prepare()];
                    case 1:
                        _b.sent();
                        console.log("Initializing...");
                        return [4 /*yield*/, this.getLastPage()];
                    case 2:
                        _b.sent();
                        console.log("find last page success! => ".concat(this._lastPage));
                        console.log("Scraping page 1");
                        return [4 /*yield*/, this.scrapeData(1)];
                    case 3:
                        _b.sent();
                        pageList = Array.from({ length: this._lastPage - 1 }, function (_, i) { return i + 2; });
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 10, 11, 16]);
                        pageList_1 = __asyncValues(pageList);
                        _b.label = 5;
                    case 5: return [4 /*yield*/, pageList_1.next()];
                    case 6:
                        if (!(pageList_1_1 = _b.sent(), !pageList_1_1.done)) return [3 /*break*/, 9];
                        page = pageList_1_1.value;
                        console.log("Scraping page ".concat(page));
                        return [4 /*yield*/, this.scrapeData(page)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8: return [3 /*break*/, 5];
                    case 9: return [3 /*break*/, 16];
                    case 10:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 16];
                    case 11:
                        _b.trys.push([11, , 14, 15]);
                        if (!(pageList_1_1 && !pageList_1_1.done && (_a = pageList_1["return"]))) return [3 /*break*/, 13];
                        return [4 /*yield*/, _a.call(pageList_1)];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13: return [3 /*break*/, 15];
                    case 14:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 15: return [7 /*endfinally*/];
                    case 16:
                        this.prepareDestroy();
                        return [3 /*break*/, 18];
                    case 17:
                        error_1 = _b.sent();
                        console.error(error_1);
                        return [3 /*break*/, 18];
                    case 18: return [2 /*return*/];
                }
            });
        });
    };
    return DividendScraper;
}());
var scraper = new DividendScraper();
scraper.main().then(function () {
    console.log(scraper.filterData(scraper.scrapedData));
});
