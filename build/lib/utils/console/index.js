"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const current_date_1 = __importDefault(require("@utils/current-date"));
const chalk_1 = __importDefault(require("chalk"));
class ConsoleUtils {
    log(message) {
        console.log(chalk_1.default.bgCyan.black.dim("[INFO]"), chalk_1.default.gray(current_date_1.default.getDate), message);
    }
    warn(message) {
        console.log(chalk_1.default.bgYellow.black.dim("[WARNING]"), chalk_1.default.gray(current_date_1.default.getDate), message);
    }
    success(message) {
        console.log(chalk_1.default.bgGreen.black.dim("[SUCCESS]"), chalk_1.default.gray(current_date_1.default.getDate), message);
    }
    error(message) {
        console.log(chalk_1.default.bgRedBright.black.dim("[ERROR]"), chalk_1.default.gray(current_date_1.default.getDate), message);
    }
    critical(message) {
        console.log(chalk_1.default.bgRed.black.dim("[CRITICAL]"), chalk_1.default.gray(current_date_1.default.getDate), message);
    }
    customizable(prefix, message, prefixColor, textColor) {
        console.log(chalk_1.default.bgHex(prefixColor).black.dim(`[${prefix}]`), chalk_1.default.gray(current_date_1.default.getDate), chalk_1.default.hex(textColor).black.dim(message));
    }
    default(any) {
        console.log(any);
    }
}
module.exports = new ConsoleUtils();
