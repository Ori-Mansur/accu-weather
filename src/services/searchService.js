'use strict'
import HttpService from "./HttpService";




const BASE_URL = '//dataservice.accuweather.com/locations/v1/';
async function search(q) {
    return await HttpService.get(`${BASE_URL}cities/autocomplete?apikey=SQz0uNgBtJntBwcX3z7OkICnoaM3AO5G&q=${q}`);
}
async function searchByGeoLocation(q) {
    return await HttpService.get(`${BASE_URL}cities/geoposition/search?apikey=SQz0uNgBtJntBwcX3z7OkICnoaM3AO5G&q=${q}`);
}
export default {
    search,
    searchByGeoLocation
}