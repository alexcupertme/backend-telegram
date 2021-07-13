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
import { acceptHeaders } from "./middlewares/accept-headers.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { unknownMethodMiddleware } from "./middlewares/unknown-method.middleware";
import { namespaceValidationMiddleware } from "./middlewares/validation/validation-namespace.middleware";
import { methodValidationMiddleware } from "./middlewares/validation/validation-methods.middleware";
import { FieldsValidation } from "./middlewares/validation/validation-fields.middleware";
import { authorizationMiddleware } from "./middlewares/authorization.middleware";
import { Database } from "./database";
import console from "@utils/console";

import express, { NextFunction } from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
let app = express();

const { SERVER_PORT } = process.env;

const fieldsValidation = new FieldsValidation();
const database = new Database();
database.connect();
app.use(acceptHeaders);
app.use(cors());
app.use(bodyParser.json());
app.post(
	"/api/:version/:namespace/:method",
	namespaceValidationMiddleware,
	methodValidationMiddleware,
	fieldsValidation.fieldsValidationMiddleware,
	authorizationMiddleware,
	async function (req: Request, res: Response, next: NextFunction) {
		console.log("Success!");
		console.log(req.body);
		await res.send(await res.locals.methodEl.method(req, res, next));
	}
);
app.use(unknownMethodMiddleware);
app.use(errorMiddleware);
app.listen(SERVER_PORT, function () {
	console.log("Backend listening on " + SERVER_PORT);
});
