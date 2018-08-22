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
import { RootState, ItemType } from '../models';
import { updateLayer } from '../actions/index';
import LayerDetailsPanel, { ILayerDetailsPanelProps } from '../components/LayerDetailsPanel';

const mapStateToProps = (state: RootState): Partial<ILayerDetailsPanelProps> => {
    const selectedLayerId = state.selectedItem !== null && state.selectedItem.type === ItemType.Layer
        ? state.selectedItem.id
        : null;
    const selectedLayer = state.layers.get(selectedLayerId);
    return {
        isEdit: state.isEdit,
        isVisible: selectedLayer != null,
        layer: selectedLayer
    };
};

const mapDispatchToProps = (dispatch): Partial<ILayerDetailsPanelProps> => ({
    onSave: l => dispatch(updateLayer(l.id, l))
});

const LayerDetails = connect(mapStateToProps, mapDispatchToProps)(LayerDetailsPanel);

export default LayerDetails;
