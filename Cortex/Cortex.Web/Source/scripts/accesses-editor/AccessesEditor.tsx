import * as React from 'react';

import EditAccessEditor from './EditAccessEditor';
import ViewAccessEditor from './ViewAccessEditor';
import UsersSearcher from './UsersSearcher';
import User from './models/User';

import '../../styles/accesses-editor.less';

class StateAndProps {
    public viewMode: number;
    public editMode: number;
    public viewUsers: User[];
    public editUsers: User[];

    constructor(viewMode: number, editMode: number, viewUsers: User[], editUsers: User[]) {
        this.viewMode = viewMode;
        this.editMode = editMode;
        this.viewUsers = viewUsers;
        this.editUsers = editUsers;
    }
}

export default class AccessesEditor
    extends React.Component<StateAndProps, StateAndProps> {

    constructor(props: StateAndProps) {
        super(props);
        this.onViewModeChanged = this.onViewModeChanged.bind(this);
        this.onEditModeChanged = this.onEditModeChanged.bind(this);
        this.onViewUsersChanged = this.onViewUsersChanged.bind(this);
        this.onEditUsersChanged = this.onEditUsersChanged.bind(this);
        this.setState = this.setState.bind(this);
        this.state = {
            viewMode: props.viewMode,
            editMode: props.editMode,
            viewUsers: props.viewUsers,
            editUsers: props.editUsers
        };
    }

    private onViewModeChanged(mode: number) {
        this.setState(prevState => new StateAndProps(mode, prevState.editMode, prevState.viewUsers, prevState.editUsers));
    }

    private onEditModeChanged(mode: number) {
        this.setState(prevState => new StateAndProps(prevState.viewMode, mode, prevState.viewUsers, prevState.editUsers));
    }

    private onViewUsersChanged(users: User[]) {
        this.setState(prevState => new StateAndProps(prevState.viewMode, prevState.editMode, users, prevState.editUsers));
    }

    private onEditUsersChanged(users: User[]) {
        this.setState(prevState => new StateAndProps(prevState.viewMode, prevState.editMode, prevState.viewUsers, users));
    }

    public render() {
        const viewUsers = this.state.viewUsers
            .map(u =>
                <input type="hidden" name="ViewUsers" value={u.id} key={u.id} />);
        const editUsers = this.state.editUsers
            .map(u =>
                <input type="hidden" name="EditUsers" value={u.id} key={u.id} />);

        return (
            <div>
                <div className="accesses-editor">
                    <input type="hidden" name="ViewMode" value={this.state.viewMode} />
                    <input type="hidden" name="EditMode" value={this.state.editMode} />
                    {viewUsers}
                    {editUsers}

                    <div className="labels-column">
                        <span className="cell"></span>
                        <span className="cell">Private</span>
                        <span className="cell">By permission</span>
                        <span className="cell">Public</span>
                    </div>
                    <ViewAccessEditor mode={this.state.viewMode} onModeChanged={this.onViewModeChanged} />
                    <EditAccessEditor editMode={this.state.editMode} viewMode={this.state.viewMode} onModeChanged={this.onEditModeChanged} />
                </div>
                <div className="permissions-editor">
                    {this.state.viewMode == 1 &&
                        <div className="editor-row">
                            <label>Can view</label>
                            <UsersSearcher users={this.state.viewUsers} onUsersChanged={this.onViewUsersChanged} />
                        </div>}
                    {this.state.editMode == 1 &&
                        <div className="editor-row">
                            <label>Can edit</label>
                            <UsersSearcher users={this.state.editUsers} onUsersChanged={this.onEditUsersChanged} />
                        </div>}
                </div>
            </div>);
    }
}