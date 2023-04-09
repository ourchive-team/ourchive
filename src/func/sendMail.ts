import emailjs from 'emailjs-com';

export function sendMail({ toEmail, imageTitle, creatorNickname, phrase, imageUrl, proveUrl }: any) {
  const SERVICE_ID = 'service_sxcooba'; // emailjs.com에서 생성한 서비스 ID
  const TEMPLATE_ID = 'template_wachdrr'; // emailjs.com에서 생성한 템플릿 ID
  const PUBLIC_KEY = 'Zxxzo3ndUSqKmnT3J';

  const emailParams = {
    toEmail,
    imageTitle,
    creatorNickname,
    phrase,
    imageUrl,
    proveUrl,
  };

  emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams, PUBLIC_KEY).then(
    response => {
      console.log('SUCCESS!', response.status, response.text);
    },
    error => {
      console.log('FAILED...', error);
    },
  );
}
