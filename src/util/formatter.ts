import moment from 'moment';

export const timeFormatter = (value: number) => {
    return moment(value).format('HH:mm');
};

export const dateFormatter = (value: number) => {
    return moment(value).format('DD/MM/YYYY');
};