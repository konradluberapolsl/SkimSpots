
const yourLocalIP : string = "192.168.0.80"

const url: string = `http://${yourLocalIP}:8000/api`

export async function client( endpoint: string, query: string) : Promise<any> {
    return await fetch(`${url}/${endpoint}/${query}`)
        .then((res) => {
            console.log(`${url}/${endpoint}/${query}`)
            if(res.ok) return res.json();
            if(!res.ok) return Promise.reject(`Http error: ${res.status}`);
        }).catch((error) => {
            return Promise.reject(`Network error: ${error}`);
        });
}