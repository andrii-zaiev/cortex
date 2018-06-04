import * as React from 'react';

import '../../styles/network-editor.less';

import EditorToolbar from './EditorToolbar';
import NetworkDisplayArea from './NetworkDisplayArea';
import Network from './models/Network';
import Layer from './models/Layer';
import EventBus from './events/EventBus';
import { MessageType } from './events/Message';
import Connection from './models/Connection';
import LayerDetails from './LayerDetails';
import NetworkService from './services/NetworkService';

class NetworkEditorProps {
    public networkId: string;
    public versionId: string;
    public isReadOnly: boolean;
}

class NetworkEditorState {
    public network: Network;
    public isEdit: boolean;
    public isLoading: boolean;

    constructor(network: Network, isEdit: boolean, isLoading: boolean) {
        this.network = network;
        this.isEdit = isEdit;
        this.isLoading = isLoading;
    }
}

export default class NetworkEditor
    extends React.Component<NetworkEditorProps, NetworkEditorState> {
    private isReadOnly: boolean;
    private networkId: string;
    private versionId: string;
    private networkService = new NetworkService();

    constructor(props: NetworkEditorProps) {
        super(props);

        this.onLayerAdded = this.onLayerAdded.bind(this);
        this.onLayerMoved = this.onLayerMoved.bind(this);
        this.onConnectionAdded = this.onConnectionAdded.bind(this);
        this.deleteLayer = this.deleteLayer.bind(this);
        this.deleteConnection = this.deleteConnection.bind(this);
        this.startEditing = this.startEditing.bind(this);

        this.isReadOnly = props.isReadOnly;
        this.networkId = props.networkId;
        this.versionId = props.versionId;
        const network = new Network([], []);

        this.state = new NetworkEditorState(network, false, true);
    }

    public componentDidMount() {
        EventBus.subscribe(MessageType.NewLayer, this.onLayerAdded);
        EventBus.subscribe(MessageType.MoveLayer, this.onLayerMoved);
        EventBus.subscribe(MessageType.NewConnection, this.onConnectionAdded);
        EventBus.subscribe(MessageType.DeleteLayer, this.deleteLayer);
        EventBus.subscribe(MessageType.DeleteConnection, this.deleteConnection);

        this.loadNetwork();
    }

    private loadNetwork() {
        if (this.versionId) {
            this.networkService.getVersion(this.versionId)
                .then(network => this.setState(prevState => new NetworkEditorState(network, prevState.isEdit, false)))
                .catch(() => alert('failed to load version'));
        } else {
            this.setState(prevState => new NetworkEditorState(prevState.network, prevState.isEdit, false));
        }
    }

    public componentWillUnmount() {
        EventBus.unsubscribe(MessageType.NewLayer, this.onLayerAdded);
        EventBus.unsubscribe(MessageType.MoveLayer, this.onLayerMoved);
        EventBus.unsubscribe(MessageType.NewConnection, this.onConnectionAdded);
        EventBus.unsubscribe(MessageType.DeleteLayer, this.deleteLayer);
        EventBus.unsubscribe(MessageType.DeleteConnection, this.deleteConnection);
    }

    private onLayerAdded(layer: Layer) {
        this.setState(prevState => ({
            network: new Network(
                prevState.network.layers.concat(layer),
                prevState.network.connections)
        }));
    }

    private onLayerMoved(data) {
        this.setState(prevState => {
            const oldLayer = prevState.network.layers.find(l => l.id == data.id);
            const newLayer = new Layer(
                oldLayer.id,
                oldLayer.name,
                oldLayer.neuronsNumber,
                oldLayer.type,
                oldLayer.x + data.dx,
                oldLayer.y + data.dy,
                oldLayer.activation,
                oldLayer.kernelsNumber,
                oldLayer.kernelWidth,
                oldLayer.kernelHeight);
            return {
                network: new Network(
                    prevState.network.layers.filter(l => l != oldLayer).concat(newLayer),
                    prevState.network.connections)
            }
        });
    }

    private onConnectionAdded(connection: Connection) {
        this.setState(prevState => ({
            network: new Network(
                prevState.network.layers,
                prevState.network.connections.concat(connection))
        }));
    }

    private deleteLayer(id: number) {
        this.setState(prevState => ({
            network: new Network(
                prevState.network.layers.filter(l => l.id !== id),
                prevState.network.connections.filter(c => c.fromId !== id && c.toId !== id))
        }));
    }

    private deleteConnection(id: number) {
        this.setState(prevState => ({
            network: new Network(
                prevState.network.layers,
                prevState.network.connections.filter(c => c.id !== id))
        }));
    }

    private startEditing() {
        this.setState(prevState => new NetworkEditorState(prevState.network, true, prevState.isLoading));
    }

    public render(): React.ReactNode {
        return (
            <div className="network-editor-container">
                {!this.isReadOnly && !this.state.isEdit &&
                    <button className="button-primary" onClick={this.startEditing}>
                        <i className="fa fa-edit" />
                        <span>Edit</span>
                    </button>}
                {this.state.isEdit &&
                    <EditorToolbar network={this.state.network} networkId={this.networkId} versionId={this.versionId} />}

                <div className="display-area"
                    style={{ borderTop: this.state.isEdit ? 'none' : '1px solid #BDBDBD' }}>
                    <NetworkDisplayArea network={this.state.network} isEdit={this.state.isEdit} />
                    <LayerDetails isEdit={this.state.isEdit} network={this.state.network} />
                </div>
                {this.state.isLoading &&
                    <div className="fade">
                        <i className="fa fa-2x fa-spinner fa-spin spinner" />
                    </div>}
            </div>
            );
    }
}