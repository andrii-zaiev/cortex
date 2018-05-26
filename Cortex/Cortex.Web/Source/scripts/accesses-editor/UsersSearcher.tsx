import * as React from 'react';

import User from './models/User';

import '../../styles/accesses-editor.less';
import { clearTimeout } from 'timers';

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
}

export default class UsersSearcher extends React.Component<{}, State>{
    constructor(props) {
        super(props);

        this.removeUser = this.removeUser.bind(this);
        this.toggleDropdownList = this.toggleDropdownList.bind(this);
        this.updateSearchQuery = this.updateSearchQuery.bind(this);
        this.findUsers = this.findUsers.bind(this);

        this.state = new State([
                {
                    id: '123',
                    name: 'Jane Doe <jdoe>'
                }
            ], false, '', null, false, []);
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

    private toggleDropdownList() {
        this.setState(prevState => new State(
            prevState.users,
            !prevState.isListShown,
            prevState.searchQuery,
            prevState.searchTimer,
            prevState.searching,
            prevState.foundUsers));
    }

    private updateSearchQuery(event) {
        clearTimeout(this.state.searchTimer);

        const newQuery = event.target.value;
        const searchCanceller = setTimeout(() => this.findUsers(), 2000);

        this.setState(prevState => new State(
            prevState.users,
            prevState.isListShown,
            newQuery,
            searchCanceller,
            prevState.searching,
            prevState.foundUsers));
    }

    private findUsers() {
        this.setState(prevState => new State(
            prevState.users,
            prevState.isListShown,
            prevState.searchQuery,
            null,
            prevState.searching,
            prevState.foundUsers));
    }

    public render() {
        const users = [].concat(this.state.users)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(user =>
                <span className="user-label" key={user.id}>
                    <span>{user.name}</span>
                    <i className="fa fa-close" onClick={() => this.removeUser(user)} />
                </span>);

        let foundUsers = [];
        if (!this.state.searching && this.state.foundUsers.length > 0) {
            foundUsers = this.state.foundUsers
                .map(user =>
                    <span className="list-item" key={user.id}>
                        {user.name}
                    </span>);
        }

        return (
            <div className="users-searcher-container">
                <div className="added-users-list">
                    {users}
                </div>
                <input type="text"
                    value={this.state.searchQuery}
                    onFocus={this.toggleDropdownList}
                    onBlur={this.toggleDropdownList}
                    onChange={this.updateSearchQuery} />
                {this.state.isListShown &&
                    <div className="dropdown-list">
                    {this.state.searching &&
                        <div className="fade">
                            <i className="fa fa-spinner fa-spin spinner" />
                        </div>
                    }
                    {!this.state.searching && this.state.foundUsers.length === 0 && 
                        'No users found'
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