export function getVerifyMailContent(mail: string, hash: string) {
	return `<!DOCTYPE html>
  <html lang="en" style="background-color: white">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!-- <link rel="stylesheet" href="./style.css" /> -->
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Letter</title>
    </head>
    <body style="margin: 0; font-family: 'Roboto', sans-serif; font-size: 16px; font-weight: 400; background-color: #f6f6f6; -webkit-text-size-adjust: 100%">
      <div style="width: 600px; margin: auto">
        <table style="background-color: white; width: 100%; padding: 30px; box-sizing: border-box; text-align: center">
          <tr>
            <th style="width: 10%">
              <img
                class="adapt-img"
                src="https://pvppjn.stripocdn.email/content/guids/CABINET_02793c0169e50905e012f45a79f61839/images/97481626370239913.png"
                alt=""
                style="border: 0; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic"
                width="43"
              />
            </th>
            <th style="width: 60%; text-align: start">
              <div style="color: #9462ff; font-size: 16px; font-weight: 700">Конструктор ботов</div>
            </th>
            <th>
              <a style="color: #a9a9a9; text-decoration: none" href="https://botsfactory.ru">botsfactory.ru</a>
            </th>
          </tr>
        </table>
        <table style="background-color: white; width: 100%; padding: 30px; box-sizing: border-box; text-align: center">
          <tr>
            <td style="height: 450px">
              <h2 style="margin-bottom: 50px">Успешная регистрация</h2>
              <p>Здравствуйте, ${mail}!</p>
              <h4 style="margin-bottom: 50px">Если вы не регистрировали аккаунт, проигнорируйте данное письмо и свяжитесь с нами!</h4>
              <a
                href="https://botsfactory.ru"
                style="background-color: rgb(126, 121, 233); border-radius: 10px; padding: 15px; text-align: center; margin: auto; text-decoration: none; color: white; font-weight: 600"
                >Перейти на сайт</a
              >
              <p style="color: gray; margin-top: 50px">Данное письмо отправлено автоматически. Не отвечайте на него!</p>
  
              <div style="font-size: 18px; color: #9462ff; font-weight: 700; margin-top: 36px; margin-bottom: 20px">BotsFactory LTD</div>
  
              <div style="font-size: 14px; color: #737373; text-align: center; line-height: 1.5">
                Если у Вас остались какие-то вопросы, то напишите нам на странице <a href="">botfactory.ru/support</a>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </body>
  </html>
  
  `;
}
