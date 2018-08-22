// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


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
