import ResponseSchema from "@entities/response.entity";
import Token from "@utils/token";
import { sendEmailSMTP } from "@library/mail/send-email-smtp";
import { getVerifyMailContent } from "./get-verify-mail-content";

import { NextFunction, Request, Response } from "express";

export async function verifyMail(request: Request, response: Response, next: NextFunction): Promise<any> {
	const tokenData = await Token.createToken();
	const data = await sendEmailSMTP(request.body.mail, "Успешная регистрация! | BotsFactory LTD", "Вы успешно зарегистрировались!", getVerifyMailContent(request.body.mail, tokenData.uuid));
	console.log(data);
	return new ResponseSchema(
		request.originalUrl,
		{
			token: tokenData.token,
		},
		"Success! Then you need to verify your mail!"
	);
}
