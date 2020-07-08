export const __fetch = (path, method, payload) => {

    let URL = 'https://api-staging.planningplus.cloud/api/test-flags';


    let options = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    if (method !== "GET") {
        options.body = JSON.stringify(payload)
    }

    if (path !== null) {
        URL += `${path}`
    }

    return fetch(URL, options)
        .then(j => j.json())
        .then(res => Promise.resolve(res))

}