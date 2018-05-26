import * as React from 'react';

import EditAccessEditor from './EditAccessEditor';
import ViewAccessEditor from './ViewAccessEditor';
import UsersSearcher from './UsersSearcher';

import '../../styles/accesses-editor.less';

export default class AccessesEditor
    extends React.Component<{ viewMode: number, editMode: number }, { viewMode: number, editMode: number }> {

    constructor(props) {
        super(props);
        this.onViewModeChanged = this.onViewModeChanged.bind(this);
        this.onEditModeChanged = this.onEditModeChanged.bind(this);
        this.setState = this.setState.bind(this);
        this.state = {
            viewMode: props.viewMode,
            editMode: props.editMode
        };
    }

    public onViewModeChanged(mode: number) {
        this.setState(prevState => ({ viewMode: mode, editMode: prevState.editMode }));
    }

    public onEditModeChanged(mode: number) {
        this.setState(prevState => ({ viewMode: prevState.viewMode, editMode: mode }));
    }

    public render() {
        return (
            <div>
                <div className="accesses-editor">
                    <input type="hidden" name="ViewMode" value={this.state.viewMode} />
                    <input type="hidden" name="EditMode" value={this.state.editMode} />

                    <div className="labels-column">
                        <span className="cell"></span>
                        <span className="cell">Private</span>
                        <span className="cell">By permission</span>
                        <span className="cell">Public</span>
                    </div>
                    <ViewAccessEditor mode={this.state.viewMode} onModeChanged={this.onViewModeChanged} />
                    <EditAccessEditor editMode={this.state.editMode} viewMode={this.state.viewMode} onModeChanged={this.onEditModeChanged} />
                </div>
                <UsersSearcher />
            </div>);
    }
}