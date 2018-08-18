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