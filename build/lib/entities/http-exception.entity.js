"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException {
    constructor(data, message, error) {
        this.data = data;
        this.message = message;
        this.error = error;
    }
}
exports.HttpException = HttpException;
