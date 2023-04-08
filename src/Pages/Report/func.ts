export interface ISendEmail {
  creatorNickname: string;
  imageTitle: string;
  phrase: string;
  emailToRequest: string;
}

export async function sendEmail({ creatorNickname, imageTitle, phrase, emailToRequest }: ISendEmail) {
  const sheetId = '1OMNwC1Ub4tsCb5UeMMIyI4IW2uLzdpvWj1AAEQrsHmM';
  const scriptUrl =
    'https://script.google.com/macros/s/AKfycbyWBgkpPVqf58j5KDVrzjwdwdQvZZx4h1rgBl6FybKwWBwLfCYOc-VDyhCavDK5d0PQ4w/exec';

  // 이미지를 선택합니다.

  const subject = 'Ourchive';
  const script = document.createElement('script');
  script.src = `${scriptUrl}?sheetId=${sheetId}&email=${emailToRequest}&subject=${subject}&creatorNickname=${creatorNickname}&imageTitle=${imageTitle}&phrase=${phrase}&callback=callback`;
  document.body.appendChild(script);
  //@ts-ignore
  window.callback = function () {
    console.log('Email sent!');
  };
}
