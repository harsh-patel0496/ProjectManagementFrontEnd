import axios from 'axios'

const BASEURL = 'http://127.0.0.1:8000/api'

export const apiCall = (options) => {
    return new Promise(async (resolve,reject) => {
        let axiosConfig = {}
        axiosConfig.method = options.method
        axiosConfig.url = BASEURL + options.url
        axiosConfig.headers = setHeaders(options.data)
        if (options.data) {
            if (options.data.params) axiosConfig.params = options.data.params;

            if (options.data.data) axiosConfig.data = options.data.data;
        }
        try{
            const response = await axios(axiosConfig)
            resolve(response)
        } catch(e){
            reject(e)
        }
    })
}

const setHeaders = (data) => {
    let headers = {};
    headers["accept-language"] = "en";
    headers["Content-Type"] = "application/json";

    let user = localStorage.getItem("user");
    if (user !== "" && user !== undefined) {
        user = JSON.parse(user)
        if(user && user.token){
            
            headers["Authorization"] = `Bearer ${user.token}`

        }
    }

    return headers
}