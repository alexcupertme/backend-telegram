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
import { errorMiddleware } from "./middlewares/error.middleware";
import { unknownMethodMiddleware } from "./middlewares/unknown-method.middleware";
import { namespaceValidationMiddleware } from "./middlewares/validation/validation-namespace.middleware";
import { methodValidationMiddleware } from "./middlewares/validation/validation-methods.middleware";
import { FieldsValidation } from "./middlewares/validation/validation-fields.middleware";
import { authorizationMiddleware } from "./middlewares/authorization.middleware";
import { Database } from "@database/index";
import { Constants } from "@constants";
import console from "@utils/console";

import https from "https";
import fs from "fs";
import express, { NextFunction } from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

let app = express();

const fieldsValidation = new FieldsValidation();
const database = new Database();
database.connect();
app.use(cors());
app.use(bodyParser.json());
app.all(
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
// app.listen(Constants.SERVER_PORT, function () {
// 	console.log("Backend listening on " + Constants.SERVER_PORT);
// });
https.createServer(app).listen(process.env.PORT || Constants.SERVER_PORT, () => {
	console.log("Backend listening on " + process.env.PORT || Constants.SERVER_PORT);
});
