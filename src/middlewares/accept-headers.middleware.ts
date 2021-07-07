import { NextFunction, Request, Response } from "express";

export async function acceptHeaders(request: Request, response: Response, next: NextFunction) {
	response.setHeader("Access-Control-Allow-Origin", " *");
	response.setHeader("Access-Control-Allow-Headers", " *");
	response.setHeader("Access-Control-Allow-Credentials", "true");
	next();
}
