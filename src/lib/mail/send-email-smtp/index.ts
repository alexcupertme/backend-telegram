import { Constants } from "@constants";
import sendpulse from "sendpulse-api";

export async function sendEmailSMTP(toEmail: string, subject: string, text: string, html: string) {
	var TOKEN_STORAGE = "/tmp/";

	return await new Promise((resolve) => {
		sendpulse.init(Constants.SP_ID, Constants.SP_SECRET, TOKEN_STORAGE, () => {
			sendpulse.smtpSendMail(
				(data: any) => {
					resolve(data);
				},
				{
					html,
					text,
					subject,
					from: {
						name: "BotsFactory LTD",
						email: "support@botsfactory.ru",
					},
					to: [
						{
							email: toEmail,
						},
					],
				}
			);
		});
	});
}
