import * as React from 'react';
import * as Modal from 'react-modal';

import EventBus from '../events/EventBus';
import { Message, MessageType } from '../events/Message';
import NewConnectionViewModel from '../view-models/NewConnectionViewModel';
import Network from '../models/Network';
import Connection from '../models/Connection';

export default class AddConnectionDialog
    extends React.Component<{ isOpen: boolean, connectionId: number, network: Network },
                            { isOpen: boolean, connection: NewConnectionViewModel, connectionId: number, network: Network }> {
    private appElement = document.getElementById('network-editor');

    constructor(props) {
        super(props);

        this.closeDialog = this.closeDialog.bind(this);
        this.addConnection = this.addConnection.bind(this);
        this.selectFromLayer = this.selectFromLayer.bind(this);
        this.selectToLayer = this.selectToLayer.bind(this);

        this.state = {
            isOpen: props.isOpen,
            connection: new NewConnectionViewModel(props.network.layers[0].id, props.network.layers[1].id),
            connectionId: props.connectionId,
            network: props.network
        };
    }

    public static getDerivedStateFromProps(nextProps, prevState) {
        return {
            isOpen: nextProps.isOpen,
            layer: prevState.layer,
            layerId: nextProps.layerId,
            network: nextProps.network
        };
    }

    private closeDialog() {
        EventBus.emit(new Message<void>(MessageType.CloseAddConnectionDialog, null));
    }

    private addConnection() {
        const connection = this.state.connection.toModel(this.state.connectionId);
        EventBus.emit(new Message<Connection>(MessageType.NewConnection, connection));
    }

    private selectFromLayer(event) {
        const fromId = Number(event.target.value);
        this.setState(prevState => ({
            isOpen: prevState.isOpen,
            connection: new NewConnectionViewModel(fromId, prevState.connection.toId),
            connectionId: prevState.connectionId,
            network: prevState.network
        }));
    }

    private selectToLayer(event) {
        const toId = Number(event.target.value);
        this.setState(prevState => ({
            isOpen: prevState.isOpen,
            connection: new NewConnectionViewModel(prevState.connection.fromId, toId),
            connectionId: prevState.connectionId,
            network: prevState.network
        }));
    }

    public render() {
        const fromOptions = this.state.network.layers
            .map(l => <option key={l.id} value={l.id} >{l.name}</ option>);
        const toOptions = this.state.network.layers
            .map(l => <option key={l.id} value={l.id} >{l.name}</ option>);
        const connectionExists = this.state.network.connections
            .some(c => c.fromId == this.state.connection.fromId
                    && c.toId == this.state.connection.toId);

        return (
            <Modal isOpen={this.state.isOpen} appElement={this.appElement}>
                <div className="dialog-heading">
                    <h4>Add Connection</h4>
                </div>
                <div className="dialog-body">
                    <div className="form">
                        <div className="form-row">
                            <label>From</label>
                            <select value={this.state.connection.fromId} onChange={this.selectFromLayer}>
                                {fromOptions}
                            </select>
                        </div>
                        <div className="form-row">
                            <label>To</label>
                            <select value={this.state.connection.toId} onChange={this.selectToLayer}>
                                {toOptions}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="dialog-buttons">
                    <button className="button" onClick={this.closeDialog}>Cancel</button>
                    <button className="button-primary"
                        onClick={this.addConnection}
                        disabled={this.state.connection.fromId == this.state.connection.toId || connectionExists}>
                        Add
                    </button>
                </div>
            </Modal>
        );
    }
}
