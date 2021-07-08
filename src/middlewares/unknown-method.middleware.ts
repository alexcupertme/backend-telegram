import { HttpException } from "@project/lib/entities/http-exception.entity";

import { NextFunction, Request, Response } from "express";

export async function unknownMethodMiddleware(request: Request, response: Response, next: NextFunction) {
	next(new HttpException(0, 0, "Unknown method!"));
}
