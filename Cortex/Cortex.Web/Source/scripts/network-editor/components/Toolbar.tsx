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


import * as React from "react";
import { Layer, Connection } from "../models";
import { ItemType } from "../models/SelectedItem";
import { Record } from "immutable";
import AddLayerDialog from "./AddLayerDialog";
import AddConnectionDialog from "./AddConnectionDialog";
import VersionSaver from "../containers/VersionSaver";

export interface IToolbarProps {
    selected: Layer | Connection,
    type: ItemType,
    onDelete: (id: number, item: ItemType) => void,
    onCancel: () => void,
    onAddLayer: (layer: Layer) => void,
    onAddConnection: (connection: Connection) => void
}

interface IToolbarState {
    isAddLayerOpen: boolean,
    isAddConnectionOpen: boolean,
    isSaveOpen: boolean
}

const StateRecord = Record<IToolbarState>({ isAddConnectionOpen: false, isAddLayerOpen: false, isSaveOpen: false });

class ToolbarState extends StateRecord implements IToolbarState {
    constructor(state: Partial<IToolbarState> = {}) {
        super(state);
    }
}

export default class Toolbar extends React.Component<IToolbarProps, { record: ToolbarState }> {
    constructor(props: IToolbarProps) {
        super(props);

        this.openSaveDialog = this.openSaveDialog.bind(this);
        this.openAddLayerDialog = this.openAddLayerDialog.bind(this);
        this.openAddConnectionDialog = this.openAddConnectionDialog.bind(this);
        this.closeSaveDialog = this.closeSaveDialog.bind(this);
        this.closeAddLayerDialog = this.closeAddLayerDialog.bind(this);
        this.closeAddConnectionDialog = this.closeAddConnectionDialog.bind(this);
        this.addLayer = this.addLayer.bind(this);
        this.addConnection = this.addConnection.bind(this);

        this.state = { record: new ToolbarState() };
    }

    openSaveDialog() {
        this.setState(state => ({ record: state.record.set('isSaveOpen', true) }));
    }

    openAddLayerDialog() {
        this.setState(state => ({ record: state.record.set('isAddLayerOpen', true) }));
    }

    openAddConnectionDialog() {
        this.setState(state => ({ record: state.record.set('isAddConnectionOpen', true) }));
    }

    closeSaveDialog() {
        this.setState(state => ({ record: state.record.set('isSaveOpen', false) }));
    }

    closeAddLayerDialog() {
        this.setState(state => ({ record: state.record.set('isAddLayerOpen', false) }));
    }

    closeAddConnectionDialog() {
        this.setState(state => ({ record: state.record.set('isAddConnectionOpen', false) }));
    }

    addLayer(layer: Layer) {
        this.props.onAddLayer(layer);
        this.closeAddLayerDialog();
    }

    addConnection(connection: Connection) {
        this.props.onAddConnection(connection);
        this.closeAddConnectionDialog();
    }

    render(): React.ReactNode {
        return (
            <div className="toolbar">
                <button className="toolbar-button-primary" onClick={this.openSaveDialog}>
                    <i className="fa fa-save" />
                    <span>Save</span>
                </button>
                <button className="toolbar-button" onClick={this.props.onCancel}>
                    <i className="fa fa-close" />
                    <span>Cancel</span>
                </button>
                <button className="toolbar-button" title="Add layer..." onClick={this.openAddLayerDialog}>
                    <i className="fa fa-plus-square" />
                </button>
                <button className="toolbar-button" title="Add connection..." onClick={this.openAddConnectionDialog}>
                    <i className="fa fa-minus" />
                </button>
                <button className="toolbar-button"
                        title="Delete"
                        onClick={() => this.props.onDelete(this.props.selected.id, this.props.type)}
                        disabled={this.props.selected === null}>
                    <i className="fa fa-trash" />
                </button>

                <AddLayerDialog isOpen={this.state.record.isAddLayerOpen}
                    onClose={this.closeAddLayerDialog}
                    onSave={this.addLayer} />
                <AddConnectionDialog isOpen={this.state.record.isAddConnectionOpen}
                    onClose={this.closeAddConnectionDialog}
                    onSave={this.addConnection} />
                <VersionSaver isOpen={this.state.record.isSaveOpen} onClose={this.closeSaveDialog}  />
            </div>);
    }
}
