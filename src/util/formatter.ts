import moment from 'moment';

export const timeFormatter = (value: moment.Moment) => {
    return value.format('HH:mm');
};

export const dateFormatter = (value: moment.Moment) => {
    return value.format('DD/MM/YYYY');
};