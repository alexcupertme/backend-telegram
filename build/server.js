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
const unknown_method_middleware_1 = require("./middlewares/unknown-method.middleware");
const validation_namespace_middleware_1 = require("./middlewares/validation/validation-namespace.middleware");
const validation_methods_middleware_1 = require("./middlewares/validation/validation-methods.middleware");
const validation_fields_middleware_1 = require("./middlewares/validation/validation-fields.middleware");
const authorization_middleware_1 = require("./middlewares/authorization.middleware");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const index_1 = require("@database/index");
const _constants_1 = require("@constants");
const console_1 = __importDefault(require("@utils/console"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
let app = express_1.default();
const fieldsValidation = new validation_fields_middleware_1.FieldsValidation();
const database = new index_1.Database();
database.connect();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use(logger_middleware_1.loggerMiddleware);
app.all("/api/:version/:namespace/:method", validation_namespace_middleware_1.namespaceValidationMiddleware, validation_methods_middleware_1.methodValidationMiddleware, fieldsValidation.fieldsValidationMiddleware, authorization_middleware_1.authorizationMiddleware, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console_1.default.log("Success!");
        console_1.default.log(req.body);
        yield res.send(yield res.locals.methodEl.method(req, res, next));
    });
});
app.use(unknown_method_middleware_1.unknownMethodMiddleware);
app.listen(process.env.PORT == undefined ? _constants_1.Constants.SERVER_PORT : process.env.PORT, () => {
    console_1.default.log(`Backend listening on ${process.env.PORT == undefined ? _constants_1.Constants.SERVER_PORT : process.env.PORT}!`);
});
