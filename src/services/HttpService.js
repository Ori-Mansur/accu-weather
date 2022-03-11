
const BASE_URL = '';

import Axios from 'axios';
var axios = Axios.create({
});

export default {
    get(endpoint, data) {
        return ajax(endpoint, 'GET', data);
    },
    post(endpoint, data, onUploadProgress) {
        return ajax(endpoint, 'POST', data, onUploadProgress);
    },
    put(endpoint, data, onUploadProgress) {
        return ajax(endpoint, 'PUT', data, onUploadProgress);
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data);
    }
}



async function ajax(endpoint, method = 'get', data = null, onUploadProgress = null) {
    try {
        var headers = {

        }
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            headers,
            onUploadProgress
        })
        return res.data;
    } catch (err) {
        console.error(err.response);
        if (err?.response?.data) {
            throw err?.response?.data;
        }
    }
}

