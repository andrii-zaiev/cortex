import * as React from 'react';
import Toolbar from '../components/Toolbar';
import { connect } from 'react-redux';
import { RootState } from '../models';
import { ItemType } from '../models/SelectedItem';
import { deleteLayer, deleteConnection } from '../actions/index';

function getSelectedItem(state: RootState) {
    const item = state.selectedItem;
    if (item !== null) {
        return item.type === ItemType.Layer
            ? state.layers.get(item.id)
            : state.connections.get(item.id);
    }

    return null;
}

const mapStateToProps = (state: RootState) => ({
    selected: getSelectedItem(state),
    type: state.selectedItem !== null ? state.selectedItem.type : null
});

const mapDispatchToProps = dispatch => ({
    onDelete: (id: number, type: ItemType) => {
        if (type === ItemType.Layer) {
            dispatch(deleteLayer(id));
        } else {
            dispatch(deleteConnection(id));
        }
    },
    onCancel: () => location.reload(false)
});

const EditorToolbar = connect(mapStateToProps, mapDispatchToProps)(Toolbar);

export default EditorToolbar;