import { NextFunction, Request, Response } from "express";
import Ajv from "ajv";
import { HttpException } from "@project/lib/entities/http-exception.entity";

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
					next(new HttpException(0, 2, `Request ${message} in '${propName}'`));
					break;
				case "pattern":
					next(new HttpException(0, 2, `Incorrect format of property '${propName}'`));
					break;
				case "maxLength":
					next(new HttpException(0, 2, `Property '${propName}' ${message}`));
					break;
				case "minLength":
					next(new HttpException(0, 2, `Property '${propName}' ${message}`));
					break;
				case "type":
					next(new HttpException(0, 2, `Property '${propName}' ${message}`));
					break;
			}
		}
	}
}
