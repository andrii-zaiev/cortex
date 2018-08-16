import * as React from 'react';
import { NetworkEditor, INetworkEditorProps } from '../components/NetworkEditor'
import { fetchNetwork, startEditing } from '../actions';
import { connect } from 'react-redux';
import { RootState } from '../models';

const mapStateToProps = (state: RootState): Partial<INetworkEditorProps> => ({
    versionId: state.versionId,
    isEdit: state.isEdit,
    isReadOnly: state.isReadOnly,
    isLoading: !state.isLoaded
});

const mapDispatchToProps = (dispatch): Partial<INetworkEditorProps> => ({
    onLoad: versionId => dispatch(fetchNetwork(versionId)),
    onEdit: () => dispatch(startEditing())
});

const NetworkEditorApp = connect(mapStateToProps, mapDispatchToProps)(NetworkEditor);

export default NetworkEditorApp;