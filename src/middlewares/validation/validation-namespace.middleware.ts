import { NextFunction, Request, Response } from "express";
import { HttpException } from "@project/lib/entities/http-exception.entity";
import { schema } from "@project/api/schema";

export async function namespaceValidationMiddleware(request: Request, response: Response, next: NextFunction) {
	const isExists = await schema.namespaces.findIndex((methodEl) => {
		return methodEl.namespace == request.params.namespace;
	});
	response.locals.namespaceIndex = isExists;
	isExists != -1 ? next() : next(new HttpException(0, 0, "This method does not exists!"));
}
