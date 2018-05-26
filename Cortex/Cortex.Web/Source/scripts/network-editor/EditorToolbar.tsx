import * as React from 'react';
import AddLayerDialog from './dialogs/AddLayerDialog';

export default class EditorToolbar
    extends React.Component<{}, { isAddOpen: boolean }> {
    constructor(props) {
        super(props);
        this.openAddDialog = this.openAddDialog.bind(this);
        this.state = { isAddOpen: false };
    }

    private openAddDialog() {
        this.setState(prevState => ({ isAddOpen: true }));
    }

    public render(): React.ReactNode {
        return (
            <div className="toolbar">
                <div className="toolbar-button" title="Add layer" onClick={this.openAddDialog}>
                    <i className="fa fa-square" />
                </div>
                <AddLayerDialog isOpen={this.state.isAddOpen} />
            </div>
        );
    }
}