import moment from 'moment';

const timeElements = document.querySelectorAll('time[data-local]');

for (let time of timeElements) {
    const datetimeAttr = time.attributes['datetime'];
    if (datetimeAttr) {
        const utc = datetimeAttr.value;
        const local = moment(utc).local().format('DD-MMM-YYYY HH:mm');
        time.innerHTML = local;
    }
}