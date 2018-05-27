import * as React from 'react';
import AddLayerDialog from './dialogs/AddLayerDialog';
import Network from './models/Network';
import EventBus from './events/EventBus';
import { MessageType } from './events/Message';

export default class EditorToolbar
    extends React.Component<{network: Network}, { isAddOpen: boolean, network: Network }> {
    constructor(props) {
        super(props);
        this.openAddDialog = this.openAddDialog.bind(this);
        this.onLayerAdded = this.onLayerAdded.bind(this);
        this.state = { isAddOpen: false, network: props.network };
    }

    public componentDidMount() {
        EventBus.subscribe(MessageType.NewLayer, this.onLayerAdded);
    }

    public componentWillUnmount() {
        EventBus.unsubscribe(MessageType.NewLayer, this.onLayerAdded);
    }

    private openAddDialog() {
        this.setState(prevState => ({ isAddOpen: true }));
    }

    private onLayerAdded(layer) {
        this.setState(prevState => ({ isAddOpen: false }));
    }

    private getNextLayerId() {
        const maxId = Math.max(...this.state.network.layers.map(l => l.id));
        return maxId + 1;
    }

    public render(): React.ReactNode {
        return (
            <div className="toolbar">
                <div className="toolbar-button" title="Add layer" onClick={this.openAddDialog}>
                    <i className="fa fa-square" />
                </div>
                <AddLayerDialog layerId={this.getNextLayerId()} isOpen={this.state.isAddOpen} />
            </div>
        );
    }
}