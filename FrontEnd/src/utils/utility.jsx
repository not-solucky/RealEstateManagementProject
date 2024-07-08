function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return `Joined ${date.toLocaleDateString('en-GB', options)}`;
}

export const Utility = {
    formatDate
}