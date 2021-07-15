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
Object.defineProperty(exports, "__esModule", { value: true });
exports.namespaceValidationMiddleware = void 0;
const _errorSchema_1 = require("@errorSchema");
const _schema_1 = require("@schema");
const _errorCodes_1 = require("@errorCodes");
function namespaceValidationMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const namespaceIndex = yield _schema_1.schema.namespaces.findIndex((namespaceEl) => {
            return namespaceEl.name == request.params.namespace;
        });
        response.locals.namespaceIndex = namespaceIndex;
        if (namespaceIndex != -1) {
            response.locals.namespace = _schema_1.schema.namespaces[namespaceIndex];
            next();
        }
        else
            next(new _errorSchema_1.HttpException(0, "", _errorCodes_1.ErrorCodes.badRequest.unknownNamespace));
    });
}
exports.namespaceValidationMiddleware = namespaceValidationMiddleware;
