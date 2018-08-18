import * as React from 'react';
import Toolbar, { IToolbarProps } from '../components/Toolbar';
import { connect } from 'react-redux';
import { RootState, Layer } from '../models';
import { ItemType } from '../models/SelectedItem';
import { deleteLayer, deleteConnection, addLayer, addConnection } from '../actions/index';

function getSelectedItem(state: RootState) {
    const item = state.selectedItem;
    if (item !== null) {
        return item.type === ItemType.Layer
            ? state.layers.get(item.id)
            : state.connections.get(item.id);
    }

    return null;
}

const mapStateToProps = (state: RootState): Partial<IToolbarProps> => ({
    selected: getSelectedItem(state),
    type: state.selectedItem !== null ? state.selectedItem.type : null
});

const mapDispatchToProps = (dispatch): Partial<IToolbarProps> => ({
    onDelete: (id: number, type: ItemType) => {
        if (type === ItemType.Layer) {
            dispatch(deleteLayer(id));
        } else {
            dispatch(deleteConnection(id));
        }
    },
    onCancel: () => location.reload(false),
    onAddLayer: (layer: Layer) => dispatch(addLayer(layer)),
    onAddConnection: (connection) => dispatch(addConnection(connection.fromId, connection.toId))
});

const EditorToolbar = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default EditorToolbar;