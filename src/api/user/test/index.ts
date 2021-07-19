import ResponseSchema from "@responseSchema";
import { NextFunction, Request, Response } from "express";

export async function test(request: Request, response: Response, next: NextFunction): Promise<any> {
	return new ResponseSchema(request.originalUrl, 0, "Success!");
}
