const { REACT_APP_TEST_KEY } = process.env;
const yourLocalIP : string = REACT_APP_TEST_KEY !== undefined ? REACT_APP_TEST_KEY : "192.168.1.88"

const url: string = `http://${yourLocalIP}:8000/api`

export async function client( endpoint: string, query: string, options = {}) : Promise<any> {

    return await fetch(`${url}/${endpoint}/${query}`, options)
        .then((res) => {
            if(res.ok) return res.json();
            if(!res.ok) return Promise.reject(`Http error: ${res.status}`);
        }).catch((error) => {
            return Promise.reject(`Network error: ${error}`);
        });
}