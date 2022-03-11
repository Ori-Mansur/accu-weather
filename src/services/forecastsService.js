'use strict'
import HttpService from "./HttpService";




const BASE_URL = '//dataservice.accuweather.com/forecasts/v1/';
async function forecastsDays(key, days) {
    return await HttpService.get(`${BASE_URL}daily/${days}/${key}?apikey=SQz0uNgBtJntBwcX3z7OkICnoaM3AO5G&details=true&metric=true `);
}
export default {
    forecastsDays
}