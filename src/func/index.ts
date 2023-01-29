export const walletConnect = () => {};

interface ImageInfo {
  id: string;
  title: string;
  price: number;
  expiry: number;
  description: string;
  creator: string;
  imgUrl: string;
}
export const getImageInfo = () => {};
export const getImageInfoList = () => {};

interface IDownloadImage {
  id: string;
}
export const downloadImage = () => {};

interface IUploadImage {
  title: string;
  description: string;
  price: number;
  img: any;
}
export const uploadImage = () => {};

interface IBuyImage {
  id: string;
}
export const buyImage = () => {};

//report, prove
interface IProveImage {
  address: string;
  phrase: string;
}
export const proveNFT = () => {};

interface IReportImage {
  address: string;
  email: string;
}
export const reportImage = () => {};
//image? || images[]?
