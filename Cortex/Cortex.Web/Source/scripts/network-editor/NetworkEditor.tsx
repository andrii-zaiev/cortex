import * as React from 'react';

import '../../styles/network-editor.less';

import EditorToolbar from './EditorToolbar';
import NetworkDisplayArea from './NetworkDisplayArea';
import Network from './models/Network';
import Layer from './models/Layer';
import EventBus from './events/EventBus';
import { MessageType } from './events/Message';
import Connection from './models/Connection';

class NetworkEditorProps {
    public networkId: string;
    public versionId: string;
    public isReadOnly: boolean;
}

class NetworkEditorState {
    public network: Network;
}

export default class NetworkEditor
    extends React.Component<NetworkEditorProps, NetworkEditorState> {

    constructor(props: NetworkEditorProps) {
        super(props);

        this.onLayerAdded = this.onLayerAdded.bind(this);
        this.onLayerMoved = this.onLayerMoved.bind(this);

        const network = new Network([
            new Layer(1, 'Layer 1', 100, 0, 10, 10),
            new Layer(2, 'Layer 2', 50, 0, 100, 10)
        ], [new Connection(1, 1, 2)]);

        this.state = { network: network };
    }

    public componentDidMount() {
        EventBus.subscribe(MessageType.NewLayer, this.onLayerAdded);
        EventBus.subscribe(MessageType.MoveLayer, this.onLayerMoved);
    }

    public componentWillUnmount() {
        EventBus.unsubscribe(MessageType.NewLayer, this.onLayerAdded);
        EventBus.unsubscribe(MessageType.MoveLayer, this.onLayerMoved);
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
                oldLayer.y + data.dy);
            return {
                network: new Network(
                    prevState.network.layers.filter(l => l != oldLayer).concat(newLayer),
                    prevState.network.connections)
            }
        });
    }

    public render(): React.ReactNode {
        return (
            <div className="network-editor-container">
                <EditorToolbar network={this.state.network} />
                <NetworkDisplayArea network={this.state.network} />
            </div>
            );
    }
}