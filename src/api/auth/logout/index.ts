import ResponseSchema from "@entities/response.entity";
import userModel from "@database/models/user.model";
import { HttpException } from "@entities/http-exception.entity";
import Token from "@utils/token";
import { ErrorCodes } from "@errorCodes";

import { NextFunction, Request, Response } from "express";

export async function logout(request: Request, response: Response, next: NextFunction): Promise<any> {
	const tokenValid = await Token.verifyToken(request.headers.authorization!);
	const tokenData = await Token.createToken();
	console.log(tokenValid.data.uuid);
	console.log(tokenData.uuid);
	if (!tokenValid) next(new HttpException(0, "", ErrorCodes.badRequest.incorrectToken));
	else {
		const findByUUID = await userModel.findOne({ uuid: tokenValid.data.uuid });
		if (!findByUUID) next(new HttpException(0, "", ErrorCodes.badRequest.incorrectToken));
		else {
			await userModel.updateOne({ uuid: tokenValid.data.uuid }, { uuid: tokenData.uuid });
			return new ResponseSchema(request.originalUrl, "", 1, "Success!");
		}
	}
}
