import * as React from 'react';
import AddLayerDialog from './dialogs/AddLayerDialog';
import Network from './models/Network';
import EventBus from './events/EventBus';
import { MessageType } from './events/Message';
import AddConnectionDialog from './dialogs/AddConnectionDialog';

export default class EditorToolbar
    extends React.Component<{ network: Network }, { isAddOpen: boolean, isAddConnectionOpen: boolean, network: Network }> {
    constructor(props) {
        super(props);
        this.openAddDialog = this.openAddDialog.bind(this);
        this.closeAddDialog = this.closeAddDialog.bind(this);
        this.openAddConnectionDialog = this.openAddConnectionDialog.bind(this);
        this.closeAddConnectionDialog = this.closeAddConnectionDialog.bind(this);

        this.state = { isAddOpen: false, isAddConnectionOpen: false, network: props.network };
    }

    public componentDidMount() {
        EventBus.subscribe(MessageType.NewLayer, this.closeAddDialog);
        EventBus.subscribe(MessageType.CloseAddDialog, this.closeAddDialog);
        EventBus.subscribe(MessageType.NewConnection, this.closeAddConnectionDialog);
        EventBus.subscribe(MessageType.CloseAddConnectionDialog, this.closeAddConnectionDialog);
    }

    public componentWillUnmount() {
        EventBus.unsubscribe(MessageType.NewLayer, this.closeAddDialog);
        EventBus.unsubscribe(MessageType.CloseAddDialog, this.closeAddDialog);
        EventBus.unsubscribe(MessageType.NewConnection, this.closeAddConnectionDialog);
        EventBus.unsubscribe(MessageType.CloseAddConnectionDialog, this.closeAddConnectionDialog);
    }

    private openAddDialog() {
        this.setState(prevState => ({ isAddOpen: true, isAddConnectionOpen: prevState.isAddConnectionOpen, network: prevState.network }));
    }

    private closeAddDialog() {
        this.setState(prevState => ({ isAddOpen: false, isAddConnectionOpen: prevState.isAddConnectionOpen, network: prevState.network }));
    }

    private openAddConnectionDialog() {
        this.setState(prevState => ({ isAddOpen: prevState.isAddOpen, isAddConnectionOpen: true, network: prevState.network }));
    }

    private closeAddConnectionDialog() {
        this.setState(prevState => ({ isAddOpen: prevState.isAddOpen, isAddConnectionOpen: false, network: prevState.network }));
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

    public render(): React.ReactNode {
        return (
            <div className="toolbar">
                <button className="toolbar-button" title="Add layer..." onClick={this.openAddDialog}>
                    <i className="fa fa-square" />
                </button>
                <button className="toolbar-button" title="Add connection..." onClick={this.openAddConnectionDialog}>
                    <i className="fa fa-minus" />
                </button>
                <button className="toolbar-button" title="Delete" onClick={this.openAddDialog} disabled={true}>
                    <i className="fa fa-trash" />
                </button>
                <AddLayerDialog layerId={this.getNextLayerId()} isOpen={this.state.isAddOpen} />
                <AddConnectionDialog connectionId={this.getNextConnectionId()}
                    isOpen={this.state.isAddConnectionOpen}
                    network={this.state.network} />
            </div>
        );
    }
}