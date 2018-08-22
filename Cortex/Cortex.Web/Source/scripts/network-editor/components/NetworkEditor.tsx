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
import EditorToolbar from '../containers/EditorToolbar';
import NetworkDisplay from '../containers/NetworkDisplay';
import LayerDetails from '../containers/LayerDetails';

export interface INetworkEditorProps {
    versionId: string,
    isLoading: boolean,
    isEdit: boolean,
    isReadOnly: boolean,
    onLoad: (versionId: string) => void,
    onEdit: () => void
}

export class NetworkEditor extends React.Component<INetworkEditorProps, {}> {
    componentDidMount() {
        this.props.onLoad(this.props.versionId);
    }

    render(): React.ReactNode {
        return (
            <div className="network-editor-container">
                {!this.props.isReadOnly && !this.props.isEdit &&
                    <button className="button-primary" onClick={this.props.onEdit}>
                        <i className="fa fa-edit" />
                        <span>Edit</span>
                    </button>}

                {this.props.isEdit && <EditorToolbar />}

                <div className="display-area"
                    style={{ borderTop: this.props.isEdit ? 'none' : '1px solid #BDBDBD' }}>
                    <NetworkDisplay />
                    <LayerDetails />
                </div>

                {this.props.isLoading &&
                    <div className="fade">
                        <i className="fa fa-2x fa-spinner fa-spin spinner" />
                    </div>}
            </div>);
    }
}
