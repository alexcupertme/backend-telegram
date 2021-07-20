import { NextFunction, Request, Response } from "express";

export function rateLimiterMiddleware(request: Request, response: Response, next: NextFunction) {
	next();
}
