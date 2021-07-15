import { HttpException } from "@errorSchema";
import { schema } from "@schema";
import { ErrorCodes } from "@errorCodes";

import { NextFunction, Request, Response } from "express";

export async function namespaceValidationMiddleware(request: Request, response: Response, next: NextFunction) {
	const namespaceIndex = await schema.namespaces.findIndex((namespaceEl) => {
		return namespaceEl.name == request.params.namespace;
	});
	response.locals.namespaceIndex = namespaceIndex;
	if (namespaceIndex != -1) {
		response.locals.namespace = schema.namespaces[namespaceIndex];
		next();
	} else next(new HttpException(0, "", ErrorCodes.badRequest.unknownNamespace));
}
