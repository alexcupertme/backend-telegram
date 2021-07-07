import { NextFunction, Request, Response } from "express";
import { HttpException } from "@project/lib/entities/http-exception.entity";
import { schema } from "@project/api/schema";
import { parseNumber } from "@project/lib/utils/parse-number";

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
	const requestedVersion: number = parseNumber(request.params.version);
	let methodIndex;
	schema.namespaces[response.locals.namespaceIndex].methods.map((methodEl, index, array) => {
		if (methodEl.name != request.params.method) {
			next(new HttpException(0, 0, "This method does not exists!"));
		} else if (methodEl.minVersion > requestedVersion || methodEl.maxVersion < requestedVersion) {
			next(new HttpException(0, 2, "Invalid API version!"));
		}
		methodIndex = index;
		response.locals.methodIndex = methodIndex;
	});
	next();
}
