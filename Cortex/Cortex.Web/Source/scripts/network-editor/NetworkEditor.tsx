import * as React from 'react';

import '../../styles/network-editor.less';
import EditorToolbar from './EditorToolbar';
import NetworkDisplayArea from './NetworkDisplayArea';

class NetworkEditorProps {
    public networkId: string;
    public versionId: string;
    public isReadOnly: boolean;
}

export default class NetworkEditor
    extends React.Component<NetworkEditorProps, {}> {

    constructor(props: NetworkEditorProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div className="network-editor-container">
                <EditorToolbar />
                <NetworkDisplayArea />
            </div>
            );
    }
}