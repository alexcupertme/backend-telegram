import Token from "@utils/token";
import { ErrorCodes } from "@errorCodes";
import { HttpException } from "@errorSchema";
import userModel from "@models/user.model";

import { NextFunction, Request, Response } from "express";

export async function authorizationMiddleware(request: Request, response: Response, next: NextFunction) {
	if (response.locals.methodEl.roles.find((rolesEl: string) => rolesEl == "default")) next();
	else if (!request.headers["authorization"]) next(new HttpException(0, "", ErrorCodes.badRequest.noToken));
	else if (!Token.verifyToken(request.headers["authorization"]).valid) next(new HttpException(0, "", ErrorCodes.badRequest.incorrectToken));
	else {
		const user: any = await userModel.findOne({ uuid: Token.verifyToken(request.headers["authorization"]).data.uuid }).exec();
		if (!user) next(new HttpException(0, "", ErrorCodes.badRequest.incorrectToken));
		else if (!response.locals.methodEl.roles.find((rolesEl: string) => rolesEl == user.role)) next(new HttpException(0, "", ErrorCodes.badRequest.accessDenied));
		else {
			next();
		}
	}
}
