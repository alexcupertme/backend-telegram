import { NextFunction, Request, Response } from "express";
import { HttpException } from "@project/lib/entities/http-exception.entity";

export async function unknownMethodMiddleware(request: Request, response: Response, next: NextFunction) {
	next(new HttpException(0, 0, "This method does not exists!"));
}
