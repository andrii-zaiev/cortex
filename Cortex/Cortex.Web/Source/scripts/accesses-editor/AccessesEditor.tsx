import * as React from 'react';

import EditAccessEditor from './EditAccessEditor';
import ViewAccessEditor from './ViewAccessEditor';

import '../../styles/accesses-editor.less';

export default class AccessesEditor
    extends React.Component<{ viewMode: number, editMode: number }, { viewMode: number, editMode: number }> {

    constructor(props) {
        super(props);
        this.state = {
            viewMode: props.viewMode,
            editMode: props.editMode
        };
    }

    public render() {
        return (
            <div className="accesses-editor">
                <div className="labels-column">
                    <span className="cell"></span>
                    <span className="cell">Private</span>
                    <span className="cell">By permission</span>
                    <span className="cell">Public</span>
                </div>
                <ViewAccessEditor mode={this.state.viewMode} />
                <EditAccessEditor editMode={this.state.editMode} viewMode={this.state.viewMode} />
            </div>);
    }
}