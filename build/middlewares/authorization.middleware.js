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
exports.authorizationMiddleware = void 0;
const token_1 = __importDefault(require("@utils/token"));
const _errorCodes_1 = require("@errorCodes");
const _errorSchema_1 = require("@errorSchema");
const user_model_1 = __importDefault(require("@database/models/user.model"));
function authorizationMiddleware(request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (response.locals.methodEl.roles.find((rolesEl) => rolesEl == "default"))
            next();
        else if (!request.headers["authorization"])
            next(new _errorSchema_1.HttpException(0, "", _errorCodes_1.ErrorCodes.badRequest.noToken));
        else if (!token_1.default.verifyToken(request.headers["authorization"]).valid)
            next(new _errorSchema_1.HttpException(0, "", _errorCodes_1.ErrorCodes.badRequest.incorrectToken));
        else {
            const user = yield user_model_1.default.findOne({ uuid: token_1.default.verifyToken(request.headers["authorization"]).data.uuid }).exec();
            console.log(response.locals.methodEl);
            if (!user)
                next(new _errorSchema_1.HttpException(0, "", _errorCodes_1.ErrorCodes.badRequest.incorrectToken));
            else if (!response.locals.methodEl.roles.find((rolesEl) => rolesEl == user.role))
                next(new _errorSchema_1.HttpException(0, "", _errorCodes_1.ErrorCodes.badRequest.accessDenied));
            else if (response.locals.methodEl.mailVerification && !user.verified)
                next(new _errorSchema_1.HttpException(0, "", _errorCodes_1.ErrorCodes.badRequest.noVerifiedMail));
            else {
                next();
            }
        }
    });
}
exports.authorizationMiddleware = authorizationMiddleware;
