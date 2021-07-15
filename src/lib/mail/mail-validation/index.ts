import { Constants } from "@constants";
import console from "@utils/console";
import { getMailContent } from "./get-mail-content";
import axios from "axios";

class MailValidation {
	async addToConfirmation(email: string) {
		try {
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
						email: "vzlomed@gmail.com",
					},
					to: [
						{
							email: email,
						},
					],
					subject: "Успешная регистрация! | BotFactory Ltd",
					htmlContent: getMailContent(email, "aw3awdjj21j5jjjdajwd", "Александр"),
				},
			});
			return data.data ? data.data : null;
		} catch (e) {
			console.error(e.response.data);
		}
	}
}

export = new MailValidation();
