import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../models';
import NetworkDisplayArea, { INetworkDisplayAreaProps } from '../components/NetworkDisplayArea';
import { deselectItem, moveLayer, selectItem } from '../actions';

const mapStateToProps = (state: RootState): Partial<INetworkDisplayAreaProps> => ({
    connections: state.connections.valueSeq().toArray(),
    isEdit: state.isEdit,
    layers: state.layers.valueSeq().toArray(),
    selectedItem: state.selectedItem
});

const mapDispatchToProps = (dispatch): Partial<INetworkDisplayAreaProps> => ({
    onDeselect: dispatch(deselectItem()),
    onMoveLayer: (id, dx, dy) => dispatch(moveLayer(id, dx, dy)),
    onSelect: (item) => dispatch(selectItem(item.id, item.type))
});

const NetworkDisplay = connect(mapStateToProps, mapDispatchToProps)(NetworkDisplayArea);

export default NetworkDisplay;