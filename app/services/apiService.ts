import { getAccessToken } from "../lib/action";


const apiHost = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:8000';


const apiService = {
    get: async function (url: string): Promise<any> {
        console.log('get', url);


        const token = await getAccessToken();




        return new Promise((resolve, reject) => {
            fetch(`${apiHost}${url}`.replace(/([^:]\/)\/+/g, "$1"), {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);
                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },




    post: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data);


        const token = await getAccessToken();


        return new Promise((resolve, reject) => {
            fetch(`${apiHost}${url}`.replace(/([^:]\/)\/+/g, "$1"), {
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);


                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    },


    postWithoutToken: async function (url: string, data: any): Promise<any> {
        console.log('post', url, data);


        return new Promise((resolve, reject) => {
            fetch(`${apiHost}${url}`.replace(/([^:]\/)\/+/g, "$1"), {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then((json) => {
                    console.log('Response:', json);


                    resolve(json);
                })
                .catch((error => {
                    reject(error);
                }))
        })
    }


}





export default apiService;



