/*
    Dev by vzlomed for BotFactory Ltd, 2021
*/
import { errorMiddleware } from "./middlewares/error.middleware";
import { unknownMethodMiddleware } from "./middlewares/unknown-method.middleware";
import { namespaceValidationMiddleware } from "./middlewares/validation/validation-namespace.middleware";
import { methodValidationMiddleware } from "./middlewares/validation/validation-methods.middleware";
import { FieldsValidation } from "./middlewares/validation/validation-fields.middleware";
import { authorizationMiddleware } from "./middlewares/authorization.middleware";
import { loggerMiddleware } from "./middlewares/logger.middleware";
import { Database } from "@database/index";
import { Constants } from "@constants";
import console from "@utils/console";

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

app.use(loggerMiddleware);

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
app.listen(process.env.PORT == undefined ? Constants.SERVER_PORT : process.env.PORT, () => {
	console.log(`Backend listening on ${process.env.PORT == undefined ? Constants.SERVER_PORT : process.env.PORT}!`);
});
