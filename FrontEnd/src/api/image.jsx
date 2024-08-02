import { config } from "../utils/config";

const GetStaticProfileImage = (image) => {
  return `${config.baseURL}/image/profile/${image}`;
};

const GetStaticPropertyImage = (image) => {
  return `${config.baseURL}/image/property/${image}`;
};

const GetStaticUserDocumentImage = (image) => {
  return `${config.baseURL}/image/udoc/${image}`;
};

const GetStaticPropertyDocumentImage = (image) => {
  return `${config.baseURL}/image/pdoc/${image}`;
};

export const ImageApi = {
  GetStaticProfileImage,
  GetStaticPropertyImage,
  GetStaticUserDocumentImage,
  GetStaticPropertyDocumentImage,
};
