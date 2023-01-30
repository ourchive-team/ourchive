import { create as ipfsHttpClient } from 'ipfs-http-client';

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecretKey = process.env.INFURA_PROJECT_KEY;
const authorization = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`, 'base64')}`;

const UploadToIPFS = async (file: File) => {
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

export default UploadToIPFS;
