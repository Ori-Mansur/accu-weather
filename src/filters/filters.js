import Vue from 'vue';


import moment from 'moment';
Vue.filter('dateFormat', (value) => {

    if (!value) return;
    var format = 'DD/MM/YYYY';
    value = moment(value).format(format);
    return value;
})
Vue.filter('dateName', (value) => {

    if (!value) return;
    var format = 'dddd';
    value = moment(value).format(format);
    return value;
})