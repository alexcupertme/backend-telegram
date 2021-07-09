import ResponseSchema from "@entities/response.entity";
import userModel from "@models/user.model";
import CryptString from "@utils/crypt-string";
import { HttpException } from "@entities/http-exception.entity";
import Token from "@utils/token";
import { ErrorCodes } from "@errorCodes";

import { NextFunction, Request, Response } from "express";

export async function login(request: Request, response: Response, next: NextFunction): Promise<any> {
	const findByLogin = await userModel.findOne({ login: request.body.login }, {}, {});
	if (!findByLogin) next(new HttpException(0, "", ErrorCodes.badRequest.incorrectAuth));
	else if (!(await CryptString.check(findByLogin.password, request.body.password))) next(new HttpException(0, "", ErrorCodes.badRequest.incorrectAuth));
	else {
		request.body.password = await CryptString.crypt(request.body.password);
		const tokenData = await Token.createToken();
		await userModel.updateOne({ login: request.body.login }, { uuid: tokenData.uuid });
		return new ResponseSchema(request.originalUrl, tokenData.token, 1, "Success!");
	}
}
