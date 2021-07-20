import Redis from "@library/redis";

import { NextFunction, Request, Response } from "express";

export async function rateLimiterMiddleware(request: Request, response: Response, next: NextFunction) {
	await Redis.client.incrby("boba", 10);
	console.log(await Redis.client.get("boba"));
	next();
}
