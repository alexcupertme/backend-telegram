import { HttpException } from "@errorSchema";
import { ErrorCodes } from "@errorCodes";

import { NextFunction, Request, Response } from "express";
import Ajv from "ajv";

export class FieldsValidation {
	async fieldsValidationMiddleware(request: Request, response: Response, next: NextFunction) {
		const ajv: Ajv = new Ajv({ strict: false, removeAdditional: true });
		const validate = ajv.compile(response.locals.methodEl.params);
		validate(request.body);
		if (!validate.errors) next();
		else {
			const propName = validate.errors[0].instancePath.split("/")[validate.errors[0].instancePath.split("/").length - 1];
			const message = validate.errors[0].message;
			switch (validate.errors[0].keyword) {
				case "required":
					next(new HttpException(0, `Request ${message}${propName != "" ? ` in '${propName}'` : ""}`, ErrorCodes.badRequest.emptyFields));
					break;
				case "pattern":
					next(new HttpException(0, `Incorrect format of property '${propName}'`, ErrorCodes.badRequest.fieldsError));
					break;
				case "maxLength":
					next(new HttpException(0, `Property '${propName}' ${message}`, ErrorCodes.badRequest.fieldsError));
					break;
				case "minLength":
					next(new HttpException(0, `Property '${propName}' ${message}`, ErrorCodes.badRequest.fieldsError));
					break;
				case "type":
					next(new HttpException(0, `Property '${propName}' ${message}`, ErrorCodes.badRequest.fieldsError));
					break;
			}
		}
	}
}
