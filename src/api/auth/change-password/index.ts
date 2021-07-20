import ResponseSchema from "@entities/response.entity";
import userModel from "@database/models/user.model";
import CryptString from "@utils/crypt-string";
import { HttpException } from "@errorSchema";
import Token from "@utils/token";
import { ErrorCodes } from "@errorCodes";

import { NextFunction, Request, Response } from "express";

export async function changePassword(request: Request, response: Response, next: NextFunction): Promise<any> {
	const tokenValid = await Token.verifyToken(request.headers.authorization!);
	const user = await userModel.findOne({ uuid: tokenValid.data.uuid });
	if (!user) next(new HttpException(0, "", ErrorCodes.badRequest.incorrectAuth));
	else if (!(await CryptString.check(user.password, request.body.password))) next(new HttpException(0, "", ErrorCodes.badRequest.incorrectAuth));
	else {
		const newPassword = await CryptString.crypt(request.body.newPassword);
		const tokenData = await Token.createToken();
		await userModel.updateOne({ uuid: tokenValid.data.uuid }, { uuid: tokenData.uuid, password: newPassword });
		return new ResponseSchema(request.originalUrl, { token: tokenData.token }, "Success!");
	}
}
