export function formatDateForForm (dateString: string) {
    return dateString.slice(0, 10);
}

export function formatDateForDisplay (dateString: string) {
    const dateObject = new Date(dateString.replace(/-/g, '/').replace(/T.+/, ''))
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const date = dateObject.getDate();
    return `${month}/${date}/${year}`;
}