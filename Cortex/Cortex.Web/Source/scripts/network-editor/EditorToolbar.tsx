import * as React from 'react';

import AddLayerDialog from './dialogs/AddLayerDialog';
import Network from './models/Network';
import EventBus from './events/EventBus';
import { MessageType, Message } from './events/Message';
import AddConnectionDialog from './dialogs/AddConnectionDialog';
import { SelectedItem, ItemType } from './models/SelectedItem';
import SaveVersionDialog from './dialogs/SaveVersionDialog';

class State {
    public isAddOpen: boolean;
    public isAddConnectionOpen: boolean;
    public network: Network;
    public selectedItem: SelectedItem;
    public isSaveOpen: boolean;

    constructor(
        isAddOpen: boolean,
        isAddConnectionOpen: boolean,
        network: Network,
        selectedItem: SelectedItem,
        isSaveOpen: boolean) {
        this.isAddOpen = isAddOpen;
        this.isAddConnectionOpen = isAddConnectionOpen;
        this.network = network;
        this.selectedItem = selectedItem;
        this.isSaveOpen = isSaveOpen;
    }
}

export default class EditorToolbar
    extends React.Component<{ network: Network, networkId: string, versionId: string }, State> {
    private networkId: string;
    private versionId: string;

    constructor(props) {
        super(props);

        this.networkId = props.networkId;
        this.versionId = props.versionId;

        this.openAddDialog = this.openAddDialog.bind(this);
        this.closeAddDialog = this.closeAddDialog.bind(this);
        this.openAddConnectionDialog = this.openAddConnectionDialog.bind(this);
        this.closeAddConnectionDialog = this.closeAddConnectionDialog.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.onItemSelected = this.onItemSelected.bind(this);
        this.openSaveDialog = this.openSaveDialog.bind(this);
        this.closeSaveDialog = this.closeSaveDialog.bind(this);
        this.reloadNetwork = this.reloadNetwork.bind(this);

        this.state = new State(false, false, props.network, null, false);
    }

    public componentDidMount() {
        EventBus.subscribe(MessageType.NewLayer, this.closeAddDialog);
        EventBus.subscribe(MessageType.CloseAddDialog, this.closeAddDialog);
        EventBus.subscribe(MessageType.NewConnection, this.closeAddConnectionDialog);
        EventBus.subscribe(MessageType.CloseAddConnectionDialog, this.closeAddConnectionDialog);
        EventBus.subscribe(MessageType.ItemSelected, this.onItemSelected);
        EventBus.subscribe(MessageType.CloseSaveDialog, this.closeSaveDialog);
    }

    public componentWillUnmount() {
        EventBus.unsubscribe(MessageType.NewLayer, this.closeAddDialog);
        EventBus.unsubscribe(MessageType.CloseAddDialog, this.closeAddDialog);
        EventBus.unsubscribe(MessageType.NewConnection, this.closeAddConnectionDialog);
        EventBus.unsubscribe(MessageType.CloseAddConnectionDialog, this.closeAddConnectionDialog);
        EventBus.unsubscribe(MessageType.ItemSelected, this.onItemSelected);
        EventBus.unsubscribe(MessageType.CloseSaveDialog, this.closeSaveDialog);
    }

    private openAddDialog() {
        this.setState(prevState => new State(
            true,
            prevState.isAddConnectionOpen,
            prevState.network,
            prevState.selectedItem,
            prevState.isSaveOpen));
    }

    private closeAddDialog() {
        this.setState(prevState => new State(
            false,
            prevState.isAddConnectionOpen,
            prevState.network,
            prevState.selectedItem,
            prevState.isSaveOpen));
    }

    private openAddConnectionDialog() {
        this.setState(prevState => new State(
            prevState.isAddOpen,
            true,
            prevState.network,
            prevState.selectedItem,
            prevState.isSaveOpen));
    }

    private closeAddConnectionDialog() {
        this.setState(prevState => new State(
            prevState.isAddOpen,
            false,
            prevState.network,
            prevState.selectedItem,
            prevState.isSaveOpen));
    }

    private onItemSelected(item: SelectedItem) {
        this.setState(prevState => new State(
            prevState.isAddOpen,
            prevState.isAddConnectionOpen,
            prevState.network,
            item,
            prevState.isSaveOpen))
    }

    private getNextLayerId() {
        if (this.state.network.layers.length == 0) {
            return 1;
        } 

        const maxId = Math.max(...this.state.network.layers.map(l => l.id));
        return maxId + 1;
    }

    private getNextConnectionId() {
        if (this.state.network.connections.length == 0) {
            return 1;
        }

        const maxId = Math.max(...this.state.network.connections.map(c => c.id));
        return maxId + 1;
    }

    public static getDerivedStateFromProps(nextProps, prevState) {
        return {
            isAddOpen: prevState.isAddOpen,
            isAddConnectionOpen: prevState.isAddConnectionOpen,
            network: nextProps.network
        };
    }

    private deleteItem() {
        const messageType = this.state.selectedItem.type === ItemType.Layer
            ? MessageType.DeleteLayer
            : MessageType.DeleteConnection;
        EventBus.emit(new Message(messageType, this.state.selectedItem.id))
    }

    private openSaveDialog() {
        this.setState(prevState => new State(
            prevState.isAddOpen,
            prevState.isAddConnectionOpen,
            prevState.network,
            prevState.selectedItem,
            true));
    }

    private closeSaveDialog() {
        this.setState(prevState => new State(
            prevState.isAddOpen,
            prevState.isAddConnectionOpen,
            prevState.network,
            prevState.selectedItem,
            false));
    }

    private reloadNetwork() {
        location.reload(false);
    }

    public render(): React.ReactNode {
        return (
            <div className="toolbar">
                <button className="toolbar-button-primary" onClick={this.openSaveDialog}>
                    <i className="fa fa-save" />
                    <span>Save</span>
                </button>
                <button className="toolbar-button" onClick={this.reloadNetwork}>
                    <i className="fa fa-close" />
                    <span>Cancel</span>
                </button>
                <button className="toolbar-button" title="Add layer..." onClick={this.openAddDialog}>
                    <i className="fa fa-plus-square" />
                </button>
                <button className="toolbar-button" title="Add connection..." onClick={this.openAddConnectionDialog}>
                    <i className="fa fa-minus" />
                </button>
                <button className="toolbar-button" title="Delete" onClick={this.deleteItem} disabled={this.state.selectedItem === null}>
                    <i className="fa fa-trash" />
                </button>

                <AddLayerDialog layerId={this.getNextLayerId()} isOpen={this.state.isAddOpen} />
                <AddConnectionDialog connectionId={this.getNextConnectionId()}
                    isOpen={this.state.isAddConnectionOpen}
                    network={this.state.network} />
                <SaveVersionDialog network={this.state.network}
                    isOpen={this.state.isSaveOpen}
                    networkId={this.networkId}
                    versionId={this.versionId} />
            </div>
        );
    }
}