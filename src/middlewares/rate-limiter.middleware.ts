import { ErrorCodes } from "@entities/error-codes.entity";
import { HttpException } from "@entities/http-exception.entity";
import Redis from "@library/redis";

import { NextFunction, Request, Response } from "express";

export async function rateLimiterMiddleware(request: Request, response: Response, next: NextFunction) {
	const ip = request.headers["x-forwarded-for"] && !Array.isArray(request.headers["x-forwarded-for"]) ? request.headers["x-forwarded-for"].split(", ")[0] : request.ip;
	const isActive = await Redis.client.exists(ip);
	await Redis.client.incr(ip);
	if (!isActive) {
		await Redis.client.expire(ip, response.locals.methodEl.timeRequestRate);
	}
	const requestCount = await Redis.client.get(ip);
	if (requestCount! >= response.locals.methodEl.maxRequestRate) {
		await Redis.client.expire(ip, response.locals.methodEl.timeRequestRate);
		next(new HttpException(0, "", ErrorCodes.badRequest.rateLimit));
	} else next();
}
