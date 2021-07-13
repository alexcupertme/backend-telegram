import ResponseSchema from "@entities/response.entity";
import userModel from "@models/user.model";
import CryptString from "@utils/crypt-string";
import { HttpException } from "@entities/http-exception.entity";
import Token from "@utils/token";
import { ErrorCodes } from "@errorCodes";

import { NextFunction, Request, Response } from "express";

export async function register(request: Request, response: Response, next: NextFunction): Promise<any> {
	const findByMail = await userModel.findOne({ mail: request.body.mail }, {}, {});

	if (findByMail) next(new HttpException(0, "", ErrorCodes.badRequest.mailWasTaken));
	else {
		request.body.password = await CryptString.crypt(request.body.password);
		await userModel.create(request.body);
		const tokenData = await Token.createToken();
		await userModel.updateOne({ mail: request.body.mail }, { id: tokenData.uuid });
		return new ResponseSchema(request.originalUrl, tokenData.token, 1, "Success!");
	}
}
