import * as React from 'react';
import EditorToolbar from '../containers/EditorToolbar';
import NetworkDisplay from '../containers/NetworkDisplay';
import LayerDetails from '../containers/LayerDetails';

export interface INetworkEditorProps {
    versionId: string,
    isLoading: boolean,
    isEdit: boolean,
    isReadOnly: boolean,
    onLoad: (versionId: string) => void,
    onEdit: () => void
}

export class NetworkEditor extends React.Component<INetworkEditorProps, {}> {
    componentDidMount() {
        this.props.onLoad(this.props.versionId);
    }

    render(): React.ReactNode {
        return (
            <div className="network-editor-container">
                {!this.props.isReadOnly && !this.props.isEdit &&
                    <button className="button-primary" onClick={this.props.onEdit}>
                        <i className="fa fa-edit" />
                        <span>Edit</span>
                    </button>}

                {this.props.isEdit && <EditorToolbar />}

                <div className="display-area"
                    style={{ borderTop: this.props.isEdit ? 'none' : '1px solid #BDBDBD' }}>
                    <NetworkDisplay />
                    <LayerDetails />
                </div>

                {this.props.isLoading &&
                    <div className="fade">
                        <i className="fa fa-2x fa-spinner fa-spin spinner" />
                    </div>}
            </div>);
    }
}