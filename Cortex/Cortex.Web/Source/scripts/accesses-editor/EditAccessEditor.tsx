import * as React from 'react';

import '../../styles/accesses-editor.less';

export default class EditAccessEditor
    extends React.Component<{ editMode: number, viewMode: number }, { mode: number, viewMode: number }> {

    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {
            mode: props.editMode,
            viewMode: props.viewMode
        };
    }

    public setMode(mode: number) {
        return () => this.setState(prevState => ({ mode: mode, viewMode: prevState.viewMode }));
    }

    public render() {
        return (
            <div className="column">
                <span className="cell">Edit</span>
                <span className="cell">
                    <input type="radio" name="editRadio" checked={this.state.mode === 0} onChange={this.setMode(0)} />
                </span>
                <span className="cell">
                    <input type="radio" name="editRadio" checked={this.state.mode === 1} disabled={this.state.mode < 1} onChange={this.setMode(1)} />
                </span>
                <span className="cell">
                    <input type="radio" name="editRadio" checked={this.state.mode === 2} disabled={this.state.mode < 2} onChange={this.setMode(2)} />
                </span>
            </div>);
    }
}