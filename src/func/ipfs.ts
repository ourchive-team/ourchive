import { create as ipfsHttpClient } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { IDownloadImage } from './type';

const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_INFURA_PROJECT_KEY;

// eslint-disable-next-line
const authorization = 'Basic ' + Buffer.from(projectId + ':' + projectSecretKey).toString('base64');

export const uploadToIPFS = async (file: File): Promise<string> => {
  const ipfs = ipfsHttpClient({
    url: 'https://ipfs.infura.io:5001/api/v0',
    headers: {
      authorization,
    },
  });
  const result = await ipfs.add(file);
  const url = `https://skywalker.infura-ipfs.io/ipfs/${result.path}`;
  return url;
};

export const downloadFromIPFS = async ({ imageUri, imageTitle }: IDownloadImage) => {
  fetch(imageUri, {
    method: "GET",
    headers: {},
  })
    .then(response => {
      response.arrayBuffer().then((buffer) => {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${imageTitle}.png`); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch(err => {
      console.log(err);
    });
};
