import { config } from "../utils/config";

const GetStaticProfileImage = (image) => {
    return `${config.baseURL}/image/profile/${image}`;
}

const GetStaticPropertyImage = (image) => {
    return `${config.baseURL}/image/property/${image}`;
}

const GetStaticUserDocumentImage = (image) => {
    return `${config.baseURL}/image/udoc/${image}`;
}

const GetStaticPropertyDocumentImage = (image) => {
    return `${config.baseURL}/image/pdoc/${image}`;
}

// gotta remove this later
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return `Joined ${date.toLocaleDateString('en-GB', options)}`;
}

export const ImageApi = {
    GetStaticProfileImage,
    GetStaticPropertyImage,
    GetStaticUserDocumentImage,
    GetStaticPropertyDocumentImage
}