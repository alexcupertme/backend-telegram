import { NextFunction, Request, Response } from "express";
import { HttpException } from "@project/lib/entities/http-exception.entity";

export async function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
	const status = 400;
	const code = error.code;
	const data = error.data || null;
	const message = error.message || "Something went wrong";
	response.status(status).send({ data, status, message, code });
}
