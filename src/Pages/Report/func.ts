export interface ISendEmail {
  creatorNickname: string;
  imageTitle: string;
  phrase: string;
  emailToRequest: string;
}

export async function sendEmail({ creatorNickname, imageTitle, phrase, emailToRequest }: ISendEmail) {
  const sheetId = '1OMNwC1Ub4tsCb5UeMMIyI4IW2uLzdpvWj1AAEQrsHmM';
  const scriptUrl =
    'https://script.google.com/macros/s/AKfycbyrtd9GcC-D3nmtEWLhJHV-j2SfxaXQck79BqacEKgr232NXBSitPvwSNzPdY8MtDAINQ/exec';

  // 이미지를 선택합니다.

  const emailHTML = `
<table style="table-layout: fixed; border-collapse: collapse; width: 100%; max-width: 600px; margin-bottom:72px;">
    <thead>
        <tr>
            <th style="background-color: #FBFE67; height:140px; font-family: Unbounded; width:100%; margin: 0px auto;"><img src="https://i.ibb.co/xX8QzPc/logo.png" alt="logo" border="0"></th>
        </tr>
    </thead>
    <tbody>
        <tr style="text-align:center">
            <td>
                <p style="font-family: Unbounded; font-style: normal; font-size: 16px; text-align:center; margin-top:40px;">
                    <strong style="font-weight: 700;">A request for proof of the Image you used has been received.</strong>
                    <br/>
                    Please visit OURCHIVE and proceed with the proof of ownership.
                </p>
            </td>
        </tr>
        <tr style="text-align:center">
            <td>
                <p style="font-family: Unbounded; font-style: normal; font-size: 16px; text-align:center; margin-top:40px;">
                    Please be advised that if you can’t prove ownership,
                    <br/>
                    <strong style="font-weight: 700;">there may be legal action against your contents.</strong>
                </p>
            </td>
        </tr>
        <tr style="text-align:center">
            <td>
                <div style="margin:40px 0px">
                    <span style="font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 10px;">Creator nickname</span>
                    <span style="font-family: Unbounded; font-style: normal; font-weight: 700; font-size: 16px;"> with " ${creatorNickname} "</span>
                </div>
            </td>
        </tr>
        <tr style="text-align:center">
            <td>
                <div style="margin:40px 0px ">
                    <span style="font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 10px;">Reported Image Title:</span>
                    <span style="font-family: Unbounded; font-style: normal; font-weight: 700; font-size: 16px;"> with " ${imageTitle} "</span>
                </div>
            </td>
        </tr>
        <tr style="text-align:center">
            <td>
                <div style="margin:40px 0px ">
                    <span style="font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 10px;">Phrase for Proof</span>
                    <span style="font-family: Unbounded; font-style: normal; font-weight: 700; font-size: 16px;"> with " ${phrase} "</span>
                </div>
            </td>
        </tr>
        <tr style="text-align:center">
            <td>
                <a>
                    <button style="font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 20px; padding:22px 50px; background-color:black; color:white; border-radius: 4px; margin-bottom: 40px;">
                        Prove Ownership
                    </button>
                </a>
            </td>
        </tr>
        <tr style="text-align:center">
            <td>
                <h2 style="font-family: Unbounded; font-style: normal; font-weight: 700; font-size: 20px;">How to prove?</h2>
            </td>
        </tr>
<!--        <table>-->
<!--            <tbody>-->
<!--                <tr>-->
<!--                    <td style="text-align:center; width:70px;">-->
<!--                        <p style="display: inline-block; font-family: Unbounded; width:70px; font-style: normal; font-weight: 700; font-size: 14px; margin-right:32px;">step1</p>-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        <p style="display: inline-block; font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 14px;">Press the “Prove Ownership”  button.</p>-->
<!--                    </td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td style="text-align:center; width:70px;">-->
<!--                          <p style="display: inline-block; font-family: Unbounded; width:70px; font-style: normal; font-weight: 700; font-size: 14px; margin-right:32px;">step2</p>-->
<!--                     </td>-->
<!--                    <td>-->
<!--                         <p style="display: inline-block; font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 14px;">Connect to wallet in OURCHIVE. It will lead you to the prove page in the platform</p>-->
<!--                    </td>-->
<!--                </tr>-->
<!--                <tr>-->
<!--                    <td style="text-align:center; width:70px;">-->
<!--                          <p style="display: inline-block; font-family: Unbounded; width:70px; font-style: normal; font-weight: 700; font-size: 14px; margin-right:32px;">step3</p>-->
<!--                     </td>-->
<!--                    <td>-->
<!--                         <p style="display: inline-block; font-family: Unbounded; font-style: normal; font-weight: 400; font-size: 14px;">Enter the page and press the “prove Ownership of Image” button.</p>-->
<!--                    </td>-->
<!--                </tr>-->
<!--            </tbody>-->
<!--        </table>-->
    </tbody>
</table>
  `;

  const emailParams = {
    email: emailToRequest,
    subject: 'Test Emailas',
    body: emailHTML,
  };
  const script = document.createElement('script');
  script.src = `${scriptUrl}?sheetId=${sheetId}&email=${emailParams.email}&subject=${
    emailParams.subject
  }&body=${encodeURIComponent(emailParams.body)}&callback=callback`;
  document.body.appendChild(script);
  //@ts-ignore
  window.callback = function () {
    console.log('Email sent!');
  };
}
