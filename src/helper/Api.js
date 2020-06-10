import axios from 'axios'

export const API = async (url) => {
    const params = {
        token: localStorage.getItem('ExoplanSessionToken')
    }
    return axios.get(url, { params }).then((response) => {
        return response
    }).catch((err) => {
        return err
    })
}

export const API2 = async (method, url) => {
    return axios.request({
        method: method,
        url: url,
        params: {
            token: localStorage.getItem('ExoplanSessionToken')
        }
    })
        .then(res => { return res })
        .catch(err => { return err })
}

