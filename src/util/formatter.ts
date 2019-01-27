import moment from 'moment';

export const timeFormatter = (value: moment.Moment | string) => {
    if (typeof value === 'string') {
        return moment(value).format('HH:mm');
    }
    return value.format('HH:mm');
};

export const dateFormatter = (value: moment.Moment | string) => {
    if (typeof value === 'string') {
        return moment(value).format('DD/MM/YYYY');
    }
    return value.format('DD/MM/YYYY');
};