import emailjs from 'emailjs-com';

export function sendEmailByEmailJS({ toEmail, imageTitle, creatorNickname, phrase, imageUrl, proveUrl }: any) {
  const SERVICE_ID = 'service_0ty64aq'; // emailjs.com에서 생성한 서비스 ID
  const TEMPLATE_ID = 'template_2wegq7b'; // emailjs.com에서 생성한 템플릿 ID
  const USER_ID = 'kcLTrHuxtIzHjpYWE';

  const emailParams = {
    toEmail,
    imageTitle,
    creatorNickname,
    phrase,
    imageUrl,
    proveUrl,
  };

  emailjs.send(SERVICE_ID, TEMPLATE_ID, emailParams, USER_ID).then(
    response => {
      console.log('SUCCESS!', response.status, response.text);
    },
    error => {
      console.log('FAILED...', error);
    },
  );
}
