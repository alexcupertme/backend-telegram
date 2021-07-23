import { Constants } from "@constants";
import console from "@utils/console";
import { getMailContent } from "./get-mail-content";
import sendpulse from "sendpulse-api";
import userModel from "@database/models/user.model";
import { v4 as uuidv4 } from "uuid";

class MailValidation {
	async addToConfirmation(email: string) {
		var TOKEN_STORAGE = "/tmp/";

		sendpulse.init(Constants.SP_ID, Constants.SP_SECRET, TOKEN_STORAGE, () => {
			const confirmId = uuidv4();
			userModel.updateOne({ email }, { confirmId });
			sendpulse.smtpSendMail(
				(data: any) => {
					console.log(data);
				},
				{
					from: {
						name: "BotFactory Ltd",
						email: "support@botsfactory.ru",
					},
					to: [
						{
							email,
						},
					],
					subject: "Успешная регистрация! | BotFactory Ltd",
					html: getMailContent(email, confirmId),
				}
			);
		});
	}
}

export = new MailValidation();
