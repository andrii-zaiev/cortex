import UserDto from './dtos/UserDto';

export default class UsersService {
    public async findUsers(query: string): Promise<UserDto[]> {
        const response = await this.sendRequest('users', 'GET', { query: query });
        const users = <UserDto[]> await response.json();
        return users;
    }

    private sendRequest(route: string, method: string, queryParams: object) {
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
            credentials: 'same-origin'
        });

        return fetch(request);
    }
}