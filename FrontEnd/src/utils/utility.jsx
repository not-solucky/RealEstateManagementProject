function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return `${date.toLocaleDateString('en-GB', options)}`;
}

function imageParser(image) {
    const base64Image = image.split(',')[1]
    return base64Image
}


export const Utility = {
    formatDate,
    imageParser
}