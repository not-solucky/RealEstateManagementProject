import { config } from "../utils/config";

export const GetStaticProfileImage = (image) => {
    return `${config}/image/profile/${image}`;
}

export const GetStaticPropertyImage = (image) => {
    return `${config}/image/property/${image}`;
}

export const GetStaticUserDocumentImage = (image) => {
    return `${config}/image/udoc/${image}`;
}

export const GetStaticPropertyDocumentImage = (image) => {
    return `${config}/image/pdoc/${image}`;
}

// gotta remove this later
export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return `Joined ${date.toLocaleDateString('en-GB', options)}`;
}