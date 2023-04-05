import { create as ipfsHttpClient } from 'ipfs-http-client';
import { Buffer } from 'buffer';

const projectId = process.env.REACT_APP_INFURA_PROJECT_ID;
const projectSecretKey = process.env.REACT_APP_INFURA_PROJECT_KEY;

// eslint-disable-next-line
const authorization = 'Basic ' + Buffer.from(projectId + ':' + projectSecretKey).toString('base64');

const UploadToIPFS = async (file: File) => {
  const ipfs = ipfsHttpClient({
    url: 'https://ipfs.infura.io:5001/api/v0',
    headers: {
      authorization,
    },
  });
  const result = await ipfs.add(file);
  console.log(result);
  const url = `https://skywalker.infura-ipfs.io/ipfs/${result.path}`;
  return url;
};

export default UploadToIPFS;
