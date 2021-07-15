import { HttpException } from "@errorSchema";

import { NextFunction, Request, Response } from "express";

export async function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
	const errorData = error.error;
	const data = error.data || null;
	const message = error.message;
	response.status(errorData.httpStatus).send({ data, message, errorData });
}
