import * as React from 'react';

import '../../styles/network-editor.less';

import EditorToolbar from './EditorToolbar';
import NetworkDisplayArea from './NetworkDisplayArea';
import Network from './models/Network';

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

        this.state = { network: null };
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