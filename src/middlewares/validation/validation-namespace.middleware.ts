import { HttpException } from "@project/lib/entities/http-exception.entity";
import { schema } from "@project/api/schema";

import { NextFunction, Request, Response } from "express";

export async function namespaceValidationMiddleware(request: Request, response: Response, next: NextFunction) {
	const namespaceIndex = await schema.namespaces.findIndex((namespaceEl) => {
		return namespaceEl.name == request.params.namespace;
	});
	response.locals.namespaceIndex = namespaceIndex;
	if (namespaceIndex != -1) {
		response.locals.namespace = schema.namespaces[namespaceIndex];
		next();
	} else next(new HttpException(0, 0, "This namespace does not exists!"));
}
