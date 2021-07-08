import { Request, Response } from "express";

export function login(request: Request, response: Response): Response {
	return response.send("456");
}
