import * as React from 'react';

import '../../styles/accesses-editor.less';

export default class EditAccessEditor
    extends React.Component<{ editMode: number, viewMode: number, onModeChanged: Function },
                            { mode: number, viewMode: number }> {
    private onModeChanged: Function;

    constructor(props) {
        super(props);
        this.onModeChanged = props.onModeChanged;
        this.setState = this.setState.bind(this);
        this.state = {
            mode: props.editMode,
            viewMode: props.viewMode
        };
    }

    public setMode(mode: number) {
        this.onModeChanged(mode);

        this.setState(prevState => ({
            mode: mode,
            viewMode: prevState.viewMode
        }));
    }

    public static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.viewMode !== prevState.viewMode) {
            const newMode = prevState.mode <= nextProps.viewMode
                            ? prevState.mode
                            : nextProps.viewMode;

            if (newMode != prevState.mode) {
                nextProps.onModeChanged(newMode);
            }

            return {
                mode: newMode,
                viewMode: nextProps.viewMode
            };
        }

        return null;
    }

    public render() {
        return (
            <div className="column">
                <span className="cell">Edit</span>
                <span className="cell">
                    <input type="radio"
                           checked={this.state.mode === 0}
                           onChange={() => this.setMode(0)} />
                </span>
                <span className="cell">
                    <input type="radio"
                           checked={this.state.mode === 1}
                           disabled={this.state.viewMode < 1}
                           onChange={() => this.setMode(1)} />
                </span>
                <span className="cell">
                    <input type="radio"
                           checked={this.state.mode === 2}
                           disabled={this.state.viewMode < 2}
                           onChange={() => this.setMode(2)} />
                </span>
            </div>);
    }
}