import { HttpException } from "@project/lib/entities/http-exception.entity";
import { ErrorCodes } from "@errorCodes";

import { NextFunction, Request, Response } from "express";

export async function unknownMethodMiddleware(request: Request, response: Response, next: NextFunction) {
	next(new HttpException(0, "", ErrorCodes.badRequest.unknownMethod));
}
