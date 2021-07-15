"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
const month = __importStar(require("./month-names.json"));
class CurrentDate {
    get getDate() {
        const date = new Date();
        return `${date.getFullYear()} ${month.names[date.getMonth()]} ${date.getDate()} ${date.getHours() < 10 ? 0 + date.getHours().toString() : date.getHours()}:${date.getMinutes() < 10 ? 0 + date.getMinutes().toString() : date.getMinutes()}:${date.getSeconds() < 10 ? 0 + date.getSeconds().toString() : date.getSeconds()}`;
    }
}
module.exports = new CurrentDate();
