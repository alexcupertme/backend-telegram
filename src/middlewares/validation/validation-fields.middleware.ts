import { HttpException } from "@errorSchema";
import { ErrorCodes } from "@errorCodes";

import { NextFunction, Request, Response } from "express";
import Ajv from "ajv";

//NEEDS TO REFACTOR
export class FieldsValidation {
	private _ajv: Ajv = new Ajv({ strict: false, removeAdditional: true });
	private _parseError(type: "Body" | "Query", keyword: string, message: string | undefined, propName: string) {
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
			default:
				return null;
		}
	}
	async bodyValidationMiddleware(request: Request, response: Response, next: NextFunction) {
		const validate = this._ajv.compile(response.locals.methodEl.params);
		validate(request.body);
		if (!validate.errors) next();
		else {
			const propName = validate.errors[0].instancePath.split("/")[validate.errors[0].instancePath.split("/").length - 1];
			const message = validate.errors[0].message;

			const fieldsError = this._parseError("Body", validate.errors[0].keyword, message, propName);
			if (!fieldsError) next(fieldsError);
			else next();
		}
	}
	async queryValidationMiddleware(request: Request, response: Response, next: NextFunction) {
		const validate = this._ajv.compile(response.locals.methodEl.params);
		validate(request.query);
		if (!validate.errors) next();
		else {
			const propName = validate.errors[0].instancePath.split("/")[validate.errors[0].instancePath.split("/").length - 1];
			const message = validate.errors[0].message;

			const fieldsError = this._parseError("Query", validate.errors[0].keyword, message, propName);
			if (!fieldsError) next(fieldsError);
			else next();
		}
	}
}
