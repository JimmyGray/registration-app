export const dateFormatter = (date: Date | undefined) => {
    if (date) {
        return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
    return '';
}