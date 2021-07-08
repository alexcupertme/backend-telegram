import ResponseSchema from "@entities/response.entity";
import userModel from "@models/user.model";

import { Request, Response } from "express";

export function register(request: Request, response: Response): ResponseSchema {
	userModel.create(request.body);
	return new ResponseSchema(response.locals.action, 0, 1, "Success!");
}
