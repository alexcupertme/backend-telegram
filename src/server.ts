/*
    Dev by vzlomed for BotFactory LLC, 2021
*/

/*
    API errors documentation

    1 - Not specified API version
    2 - API version is higher or lower
    3 - Not specified method
    4 - Unhandled error
    5 - Validation error. Empty required fields
    6 - Types validation error
*/

import express from "express";
import { Request } from "express";
import dotenv from "dotenv";
import ResponseSchema from "./lib/entities/response.entity";
import { acceptHeaders } from "./middlewares/accept-headers.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { unknownMethodMiddleware } from "./middlewares/unknown-method.middleware";
import { namespaceValidationMiddleware } from "./middlewares/validation/validation-namespace.middleware";
import { methodValidationMiddleware } from "./middlewares/validation/validation-methods.middleware";
import { FieldsValidation } from "./middlewares/validation/validation-fields.middleware";
import bodyParser from "body-parser";
dotenv.config();
let app = express();

const { SERVER_PORT } = process.env;

const fieldsValidation = new FieldsValidation();
app.use(acceptHeaders);
app.use(bodyParser.json());
app.get("/api/:version/:namespace/:method", namespaceValidationMiddleware, methodValidationMiddleware, fieldsValidation.fieldsValidationMiddleware, function (req: Request, res) {
	console.log("Success!");
	res.send(new ResponseSchema(req.params.namespace + "." + req.params.method, 0, 0, "Success!"));
});
app.use(unknownMethodMiddleware);
app.use(errorMiddleware);
app.listen(SERVER_PORT, function () {
	console.info("Backend listening on " + SERVER_PORT);
});
