import { Constants } from "@constants";
import console from "@utils/console";
import { getMailContent } from "./get-mail-content";
import axios from "axios";
import userModel from "@database/models/user.model";
import { v4 as uuidv4 } from "uuid";

class MailValidation {
	async addToConfirmation(email: string) {
		try {
			const confirmId = uuidv4();
			await userModel.updateOne({ email }, { confirmId });
			const data = await axios({
				method: "POST",
				url: "https://api.sendinblue.com/v3/smtp/email",
				headers: {
					accept: "application/json",
					"api-key": Constants.SIB_TOKEN,
					"content-type": "application/json",
				},
				data: {
					sender: {
						name: "BotFactory Ltd",
						email: "support@botsfactory.ru",
					},
					to: [
						{
							email,
						},
					],
					subject: "Успешная регистрация! | BotFactory Ltd",
					htmlContent: getMailContent(email, confirmId),
				},
			});
			return data.data ? data.data : null;
		} catch (e) {
			console.error(e.response.data);
		}
	}
}

export = new MailValidation();
