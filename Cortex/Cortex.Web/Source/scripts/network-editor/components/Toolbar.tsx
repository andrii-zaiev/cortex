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

export default class Toolbar extends React.Component<IToolbarProps, ToolbarState> {
    constructor(props: IToolbarProps) {
        super(props);

        this.openSaveDialog = this.openSaveDialog.bind(this);
        this.openAddLayerDialog = this.openAddLayerDialog.bind(this);
        this.openAddConnectionDialog = this.openAddConnectionDialog.bind(this);
        this.closeSaveDialog = this.closeSaveDialog.bind(this);
        this.closeAddLayerDialog = this.closeAddLayerDialog.bind(this);
        this.closeAddConnectionDialog = this.closeAddConnectionDialog.bind(this);

        this.state = new ToolbarState();
    }

    openSaveDialog() {
        this.setState(state => state.set('isSaveOpen', true));
    }

    openAddLayerDialog() {
        this.setState(state => state.set('isAddLayerOpen', true));
    }

    openAddConnectionDialog() {
        this.setState(state => state.set('isAddConnectionOpen', true));
    }

    closeSaveDialog() {
        this.setState(state => state.set('isSaveOpen', false));
    }

    closeAddLayerDialog() {
        this.setState(state => state.set('isAddLayerOpen', false));
    }

    closeAddConnectionDialog() {
        this.setState(state => state.set('isAddConnectionOpen', false));
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

                <AddLayerDialog isOpen={this.state.isAddLayerOpen} onClose={this.closeAddLayerDialog} onSave={this.props.onAddLayer} />
                <AddConnectionDialog isOpen={this.state.isAddConnectionOpen} onClose={this.closeAddConnectionDialog}
                    onSave={this.props.onAddConnection} />
                <VersionSaver isOpen={this.state.isSaveOpen} onClose={this.closeSaveDialog}  />
            </div>);
    }
}