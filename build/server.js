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
const error_middleware_1 = require("./middlewares/error.middleware");
const unknown_method_middleware_1 = require("./middlewares/unknown-method.middleware");
const validation_namespace_middleware_1 = require("./middlewares/validation/validation-namespace.middleware");
const validation_methods_middleware_1 = require("./middlewares/validation/validation-methods.middleware");
const validation_fields_middleware_1 = require("./middlewares/validation/validation-fields.middleware");
const authorization_middleware_1 = require("./middlewares/authorization.middleware");
const index_1 = require("@database/index");
const _constants_1 = require("@constants");
const console_1 = __importDefault(require("@utils/console"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const winston_1 = __importDefault(require("winston"));
const express_winston_1 = __importDefault(require("express-winston"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
let app = express_1.default();
const fieldsValidation = new validation_fields_middleware_1.FieldsValidation();
const database = new index_1.Database();
database.connect();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
const transport = new winston_daily_rotate_file_1.default({
    frequency: "1h",
    filename: "log-%DATE%.log",
    datePattern: "YYYY-MM-DD-HH",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    dirname: "./src/log",
});
app.use(express_winston_1.default.logger({
    transports: [transport],
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }), winston_1.default.format.printf((info) => {
        console_1.default.log(info);
        return `[${info.req.method}] ${info.req.url}`;
    })),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
}));
app.all("/api/:version/:namespace/:method", validation_namespace_middleware_1.namespaceValidationMiddleware, validation_methods_middleware_1.methodValidationMiddleware, fieldsValidation.fieldsValidationMiddleware, authorization_middleware_1.authorizationMiddleware, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console_1.default.log("Success!");
        console_1.default.log(req.body);
        yield res.send(yield res.locals.methodEl.method(req, res, next));
    });
});
app.use(unknown_method_middleware_1.unknownMethodMiddleware);
app.use(error_middleware_1.errorMiddleware);
app.listen(process.env.PORT == undefined ? _constants_1.Constants.SERVER_PORT : process.env.PORT, () => {
    console_1.default.log(`Backend listening on ${process.env.PORT == undefined ? _constants_1.Constants.SERVER_PORT : process.env.PORT}!`);
});
