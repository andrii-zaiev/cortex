import * as React from 'react';

import '../../styles/network-editor.less';

import EditorToolbar from './EditorToolbar';
import NetworkDisplayArea from './NetworkDisplayArea';
import Network from './models/Network';
import Layer from './models/Layer';

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

        const network = new Network();
        network.layers = [
            new Layer(1, 'Layer 1', 100, 0, 10, 10)
        ];

        this.state = { network: network };
    }

    public render(): React.ReactNode {
        return (
            <div className="network-editor-container">
                <EditorToolbar />
                <NetworkDisplayArea network={this.state.network} />
            </div>
            );
    }
}