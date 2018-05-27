import * as React from 'react';

import '../../styles/network-editor.less';

import EditorToolbar from './EditorToolbar';
import NetworkDisplayArea from './NetworkDisplayArea';
import Network from './models/Network';
import Layer from './models/Layer';
import EventBus from './events/EventBus';
import { MessageType } from './events/Message';

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

        const network = new Network([
            new Layer(1, 'Layer 1', 100, 0, 10, 10)
        ], []);

        this.state = { network: network };
    }

    public componentDidMount() {
        EventBus.subscribe(MessageType.NewLayer, this.onLayerAdded);
    }

    public componentWillUnmount() {
        EventBus.unsubscribe(MessageType.NewLayer, this.onLayerAdded);
    }

    private onLayerAdded(layer: Layer) {
        this.setState(prevState => ({
            network: new Network(
                prevState.network.layers.concat(layer),
                prevState.network.connections)
        }));
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