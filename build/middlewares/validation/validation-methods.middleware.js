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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.methodValidationMiddleware = void 0;
const _errorSchema_1 = require("@errorSchema");
const _schema_1 = require("@schema");
const parse_1 = __importDefault(require("@utils/parse"));
const _errorCodes_1 = require("@errorCodes");
function methodValidationMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        request.params.version.match(/^v[0-9]+$/g) ? request.params.version : -1;
        const requestedVersion = parse_1.default.parseNumber(request.params.version);
        const methodIndex = _schema_1.schema.namespaces[response.locals.namespaceIndex].methods.findIndex((methodEl) => {
            return methodEl.name == request.params.method;
        });
        if (methodIndex == -1)
            next(new _errorSchema_1.HttpException(0, "", _errorCodes_1.ErrorCodes.badRequest.unknownMethod));
        else {
            const methodEl = (response.locals.method = _schema_1.schema.namespaces[response.locals.namespaceIndex].methods[methodIndex]);
            response.locals.action = response.locals.namespace.name + "." + methodEl.name;
            response.locals.methodEl = methodEl;
            if (methodEl.minVersion > requestedVersion || methodEl.maxVersion < requestedVersion)
                next(new _errorSchema_1.HttpException(0, "", _errorCodes_1.ErrorCodes.badRequest.invalidApiVersion));
            else {
                if (methodEl.type != request.method)
                    next(new _errorSchema_1.HttpException(0, "", _errorCodes_1.ErrorCodes.badRequest.unknownMethod));
                else
                    next();
            }
        }
    });
}
exports.methodValidationMiddleware = methodValidationMiddleware;
