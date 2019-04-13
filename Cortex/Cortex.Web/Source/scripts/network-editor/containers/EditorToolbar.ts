// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


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
    type: state.selectedItem !== null ? state.selectedItem.type : null,
    canAddConnection: state.layers.count() > 1
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
