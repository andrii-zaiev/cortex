import UserDto from './dtos/UserDto';
import BaseService from '../../shared/BaseService';

export default class UsersService extends BaseService {
    public async findUsers(query: string): Promise<UserDto[]> {
        const response = await this.sendRequest('users', 'GET', { query: query });
        const users = <UserDto[]> await response.json();
        return users;
    }
}