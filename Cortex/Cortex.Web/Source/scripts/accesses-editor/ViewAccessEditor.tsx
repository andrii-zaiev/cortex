import * as React from 'react';

import '../../styles/accesses-editor.less';

export default class ViewAccessEditor
    extends React.Component<{ mode: number }, { mode: number }> {

    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {
            mode: props.mode
        };
    }

    public setMode(mode: number) {
        return () => this.setState({ mode: mode });
    }

    public render() {
        return (
            <div className="column">
                <span className="cell">View</span>
                <span className="cell">
                    <input type="radio" name="viewRadio" checked={this.state.mode === 0} onChange={this.setMode(0)} />
                </span>
                <span className="cell">
                    <input type="radio" name="viewRadio" checked={this.state.mode === 1} onChange={this.setMode(1)} />
                </span>
                <span className="cell">
                    <input type="radio" name="viewRadio" checked={this.state.mode === 2} onChange={this.setMode(2)} />
                </span>
            </div>);
    }
}