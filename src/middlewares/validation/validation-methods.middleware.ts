//@ts-ignore
import { HttpException } from "@project/lib/entities/http-exception.entity";
import { schema } from "@project/api/schema";
import Parse from "@project/lib/utils/parse";

import { NextFunction, Request, Response } from "express";

/**
 * Validating API method.
 *
 * Error codes:
 * 0 - This method does not exists
 * 1 - Not specified API version
 * 2 - Invalid API version
 */
export async function methodValidationMiddleware(request: Request, response: Response, next: NextFunction) {
	request.params.version.match(/^v[0-9]+$/g) ? request.params.version : -1;
	//@ts-ignore
	const requestedVersion: number = Parse.parseNumber(request.params.version);
	const methodIndex = schema.namespaces[response.locals.namespaceIndex].methods.findIndex((methodEl) => {
		return methodEl.name == request.params.method;
	});
	if (methodIndex == -1) next(new HttpException(0, 0, "This method does not exists!"));
	else {
		const methodEl = (response.locals.method = schema.namespaces[response.locals.namespaceIndex].methods[methodIndex]);
		response.locals.action = response.locals.namespace.name + "." + methodEl.name;
		response.locals.methodEl = methodEl;
		if (methodEl.minVersion > requestedVersion || methodEl.maxVersion < requestedVersion) {
			next(new HttpException(0, 2, "Invalid API version!"));
		} else next();
	}
}
