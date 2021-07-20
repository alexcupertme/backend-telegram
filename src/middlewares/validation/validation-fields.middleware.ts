import { HttpException } from "@errorSchema";
import { ErrorCodes } from "@errorCodes";

import { NextFunction, Request, Response } from "express";
import Ajv from "ajv";

//NEEDS TO REFACTOR
export class FieldsValidation {
	private _parseError(type: string, keyword: string, message: string | undefined, propName: string) {
		switch (keyword) {
			case "required":
				return new HttpException(0, `${type}: Request ${message}${propName != "" ? ` in '${propName}'` : ""}`, ErrorCodes.badRequest.emptyFields);
			case "pattern":
				return new HttpException(0, `${type}: Incorrect format of property '${propName}'`, ErrorCodes.badRequest.fieldsError);
			case "maxLength":
				return new HttpException(0, `${type}: Property '${propName}' ${message}`, ErrorCodes.badRequest.fieldsError);
			case "minLength":
				return new HttpException(0, `${type}: Property '${propName}' ${message}`, ErrorCodes.badRequest.fieldsError);
			case "type":
				return new HttpException(0, `${type}: Property '${propName}' ${message}`, ErrorCodes.badRequest.fieldsError);
		}
	}
	private _validate(data: any, params: any, type: "Body" | "Query") {
		const ajv: Ajv = new Ajv({ strict: false, removeAdditional: true });
		const validate = ajv.compile(params);
		validate(data);
		if (!validate.errors) return null;
		else {
			const propName = validate.errors[0].instancePath.split("/")[validate.errors[0].instancePath.split("/").length - 1];
			const message = validate.errors[0].message;
			const fieldsError = this._parseError(type, validate.errors[0].keyword, message, propName);
			if (fieldsError) return fieldsError;
			else return new HttpException(0, `Unhandler field error!`, ErrorCodes.badRequest.fieldsError);
		}
	}
	fieldsValidationMiddleware = (request: Request, response: Response, next: NextFunction) => {
		const bodyErr = this._validate(request.body, response.locals.methodEl.body, "Body");
		const queryErr = this._validate(request.query, response.locals.methodEl.query, "Query");

		if (!bodyErr && !queryErr) next();
		else next(bodyErr != null ? bodyErr : queryErr);
	};
}
