export default abstract class BaseService {
    protected sendRequest(route: string, method: string, queryParams: object = null, body: object = null) {
        const url = new URL(`${location.origin}/api/${route}`);
        const params = new URLSearchParams();

        if (queryParams) {
            for (const prop in queryParams) {
                if (queryParams.hasOwnProperty(prop)) {
                    params.append(prop, queryParams[prop]);
                }
            }
        }
        url.search = params.toString();

        const request = new Request(url.toString(), {
            method: method,
            mode: 'same-origin',
            credentials: 'same-origin',
            body: body ? JSON.stringify(body) : null
        });

        return fetch(request);
    }
}