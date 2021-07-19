import ResponseSchema from "@entities/response.entity";
import userModel from "@database/models/user.model";
import CryptString from "@utils/crypt-string";
import { HttpException } from "@errorSchema";
import Token from "@utils/token";
import { ErrorCodes } from "@errorCodes";

import { NextFunction, Request, Response } from "express";

export async function login(request: Request, response: Response, next: NextFunction): Promise<any> {
	const findByMail = await userModel.findOne({ mail: request.body.mail }, {}, {});
	if (!findByMail) next(new HttpException(0, "", ErrorCodes.badRequest.incorrectAuth));
	else if (!(await CryptString.check(findByMail.password, request.body.password))) next(new HttpException(0, "", ErrorCodes.badRequest.incorrectAuth));
	else {
		request.body.password = await CryptString.crypt(request.body.password);
		const tokenData = await Token.createToken();
		await userModel.updateOne({ mail: request.body.mail }, { uuid: tokenData.uuid });
		return new ResponseSchema(request.originalUrl, { token: tokenData.token }, 1, "Success!");
	}
}
