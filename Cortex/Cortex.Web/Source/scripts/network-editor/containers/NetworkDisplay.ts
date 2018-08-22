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
import { connect } from 'react-redux';
import { RootState } from '../models';
import NetworkDisplayArea, { INetworkDisplayAreaProps } from '../components/NetworkDisplayArea';
import { deselectItem, moveLayer, selectItem } from '../actions';

const mapStateToProps = (state: RootState): Partial<INetworkDisplayAreaProps> => ({
    connections: state.connections.valueSeq().toList(),
    isEdit: state.isEdit,
    layers: state.layers.valueSeq().toList(),
    selectedItem: state.selectedItem
});

const mapDispatchToProps = (dispatch): Partial<INetworkDisplayAreaProps> => ({
    onDeselect: () => dispatch(deselectItem()),
    onMoveLayer: (id, dx, dy) => dispatch(moveLayer(id, dx, dy)),
    onSelect: (item) => dispatch(selectItem(item.id, item.type))
});

const NetworkDisplay = connect(mapStateToProps, mapDispatchToProps)(NetworkDisplayArea);

export default NetworkDisplay;
