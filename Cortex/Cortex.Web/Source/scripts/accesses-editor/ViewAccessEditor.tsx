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

export default class ViewAccessEditor
    extends React.Component<{ mode: number, onModeChanged: Function },
                            { mode: number }> {
    private onModeChanged: Function;

    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.onModeChanged = props.onModeChanged;
        this.state = {
            mode: props.mode
        };
    }

    public setMode(mode: number) {
        this.onModeChanged(mode);
        this.setState(prevState => ({ mode: mode }));
    }

    public render() {
        return (
            <div className="column">
                <span className="cell">View</span>
                <span className="cell">
                    <input type="radio"
                           checked={this.state.mode === 0}
                           onChange={() => this.setMode(0)} />
                </span>
                <span className="cell">
                    <input type="radio"
                           checked={this.state.mode === 1}
                           onChange={() => this.setMode(1)} />
                </span>
                <span className="cell">
                    <input type="radio"
                           checked={this.state.mode === 2}
                           onChange={() => this.setMode(2)} />
                </span>
            </div>);
    }
}
