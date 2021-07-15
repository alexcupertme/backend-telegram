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
exports.FieldsValidation = void 0;
const _errorSchema_1 = require("@errorSchema");
const _errorCodes_1 = require("@errorCodes");
const ajv_1 = __importDefault(require("ajv"));
class FieldsValidation {
    fieldsValidationMiddleware(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ajv = new ajv_1.default({ strict: false, removeAdditional: true });
            const validate = ajv.compile(response.locals.methodEl.params);
            validate(request.body);
            if (!validate.errors)
                next();
            else {
                const propName = validate.errors[0].instancePath.split("/")[validate.errors[0].instancePath.split("/").length - 1];
                const message = validate.errors[0].message;
                switch (validate.errors[0].keyword) {
                    case "required":
                        next(new _errorSchema_1.HttpException(0, `Request ${message}${propName != "" ? ` in '${propName}'` : ""}`, _errorCodes_1.ErrorCodes.badRequest.emptyFields));
                        break;
                    case "pattern":
                        next(new _errorSchema_1.HttpException(0, `Incorrect format of property '${propName}'`, _errorCodes_1.ErrorCodes.badRequest.fieldsError));
                        break;
                    case "maxLength":
                        next(new _errorSchema_1.HttpException(0, `Property '${propName}' ${message}`, _errorCodes_1.ErrorCodes.badRequest.fieldsError));
                        break;
                    case "minLength":
                        next(new _errorSchema_1.HttpException(0, `Property '${propName}' ${message}`, _errorCodes_1.ErrorCodes.badRequest.fieldsError));
                        break;
                    case "type":
                        next(new _errorSchema_1.HttpException(0, `Property '${propName}' ${message}`, _errorCodes_1.ErrorCodes.badRequest.fieldsError));
                        break;
                }
            }
        });
    }
}
exports.FieldsValidation = FieldsValidation;
