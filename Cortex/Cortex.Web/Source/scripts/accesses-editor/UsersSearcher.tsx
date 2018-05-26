import * as React from 'react';

import User from './models/User';

import '../../styles/accesses-editor.less';
import UsersService from './services/UsersService';
import { log } from 'util';

class State {
    public users: User[];
    public isListShown: boolean;
    public searchQuery: string;
    public searchTimer: any;
    public searching: boolean;
    public foundUsers: User[];

    constructor(
        users: User[],
        isListShown: boolean,
        searchQuery: string,
        searchTimer: any,
        searching: boolean,
        foundUsers: User[]) {

        this.users = users;
        this.isListShown = isListShown;
        this.searchQuery = searchQuery;
        this.searchTimer = searchTimer;
        this.searching = searching;
        this.foundUsers = foundUsers;
    }

    public static empty() {
        return new State([], false, '', null, false, []);
    }
}

export default class UsersSearcher extends React.Component<{}, State>{
    private usersService: UsersService;

    constructor(props) {
        super(props);

        this.usersService = new UsersService();

        this.removeUser = this.removeUser.bind(this);
        this.toggleDropdownList = this.toggleDropdownList.bind(this);
        this.updateSearchQuery = this.updateSearchQuery.bind(this);
        this.findUsers = this.findUsers.bind(this);
        this.addUser = this.addUser.bind(this);

        this.state = State.empty();
    }

    private removeUser(user: User): void {
        this.setState(prevState => new State(
            prevState.users.filter(u => u.id != user.id),
            prevState.isListShown,
            prevState.searchQuery,
            prevState.searchTimer,
            prevState.searching,
            prevState.foundUsers));
    }

    private toggleDropdownList(event) {
        const toggle = () => this.setState(prevState => new State(
            prevState.users,
            !prevState.isListShown,
            prevState.searchQuery,
            prevState.searchTimer,
            prevState.searching,
            prevState.foundUsers));

        if (this.state.isListShown) {
            setTimeout(toggle, 500);
        } else {
            toggle();
        }
    }

    private updateSearchQuery(event) {
        clearTimeout(this.state.searchTimer);

        const newQuery = event.target.value;
        const searchTimer = setTimeout(() => this.findUsers(), 1000);

        this.setState(prevState => new State(
            prevState.users,
            prevState.isListShown,
            newQuery,
            searchTimer,
            prevState.searching,
            prevState.foundUsers));
    }

    private findUsers() {
        const isEmptyQuery = !this.state.searchQuery;

        this.setState(prevState => new State(
            prevState.users,
            prevState.isListShown,
            prevState.searchQuery,
            null,
            !isEmptyQuery,
            prevState.foundUsers));

        if (isEmptyQuery) {
            return;
        }

        this.usersService.findUsers(this.state.searchQuery)
            .then(users => this.setState(prevState => {
                const foundUsers = users
                    .map(u => new User(u.id, `${u.name} <${u.userName}>`));

                return new State(
                    prevState.users,
                    prevState.isListShown,
                    prevState.searchQuery,
                    prevState.searchTimer,
                    false,
                    foundUsers);
            }))
            .catch (() => log('cannot find users'));
    }

    private addUser(user: User) {
        this.setState(prevState => new State(
            prevState.users.concat([user]),
            prevState.isListShown,
            prevState.searchQuery,
            prevState.searchTimer,
            prevState.searching,
            prevState.foundUsers));
    }

    public render() {
        const users = [].concat(this.state.users)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(user =>
                <span className="user-label" key={user.id}>
                    <span>{user.name}</span>
                    <i className="fa fa-close close-icon" onClick={() => this.removeUser(user)} />
                </span>);

        let foundUsers = [];
        if (!this.state.searching && this.state.foundUsers.length > 0) {
            foundUsers = this.state.foundUsers
                .filter(u => this.state.users.every(c => c.id != u.id))
                .map(user =>
                    <div className="list-item" key={user.id} onClick={() => this.addUser(user)}>
                        {user.name}
                    </div>);
        }

        return (
            <div className="users-searcher-container">
                <div className="added-users-list">
                    {users}
                </div>
                <div className="search-query-input">
                    <input type="text"
                        maxLength={50}
                        value={this.state.searchQuery}
                        onFocus={this.toggleDropdownList}
                        onBlur={this.toggleDropdownList}
                        onChange={this.updateSearchQuery} />
                    <i className="fa fa-search search-icon" />
                </div>
                {this.state.isListShown &&
                    <div className="dropdown-list">
                    {this.state.searching &&
                        <div className="fade">
                            <i className="fa fa-2x fa-spinner fa-spin spinner" />
                        </div>
                    }
                    {!this.state.searching && foundUsers.length === 0 &&
                        <div className="empty-item">No users found</div>
                    }
                    {foundUsers.length > 0 &&
                        foundUsers
                    }
                    </div>
                }
            </div>
        );
    }
}