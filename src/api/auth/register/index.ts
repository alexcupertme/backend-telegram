import ResponseSchema from "@entities/response.entity";
import userModel from "@database/models/user.model";
import CryptString from "@utils/crypt-string";
import { HttpException } from "@errorSchema";
import Token from "@utils/token";
import { ErrorCodes } from "@errorCodes";
import { sendEmailSMTP } from "@library/mail/send-email-smtp";
import { getVerifyMailContent } from "../verify-mail/get-verify-mail-content";
// import MailValidation from "@library/mail/mail-validation";

import { NextFunction, Request, Response } from "express";

export async function register(request: Request, response: Response, next: NextFunction): Promise<any> {
	const findByMail = await userModel.findOne({ mail: request.body.mail }, {}, {});

	if (findByMail) next(new HttpException(0, "", ErrorCodes.badRequest.mailWasTaken));
	else {
		request.body.password = await CryptString.crypt(request.body.password);
		await userModel.create(request.body);
		const tokenData = await Token.createToken();
		await userModel.updateOne({ mail: request.body.mail }, { id: tokenData.uuid });
		await sendEmailSMTP(request.body.mail, "Успешная регистрация! | BotsFactory LTD", "Вы успешно зарегистрировались!", getVerifyMailContent(request.body.mail, tokenData.uuid));
		// MailValidation.addToConfirmation(request.body.mail);
		return new ResponseSchema(
			request.originalUrl,
			{
				token: tokenData.token,
			},
			"Success! Then you need to verify your mail!"
		);
	}
}
