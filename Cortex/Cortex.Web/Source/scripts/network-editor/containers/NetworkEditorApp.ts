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
import { NetworkEditor, INetworkEditorProps } from '../components/NetworkEditor'
import { fetchNetwork, startEditing, receiveNetwork } from '../actions';
import { connect } from 'react-redux';
import { RootState } from '../models';
import { List } from 'immutable';

const mapStateToProps = (state: RootState): Partial<INetworkEditorProps> => ({
    versionId: state.versionId,
    isEdit: state.isEdit,
    isReadOnly: state.isReadOnly,
    isLoading: !state.isLoaded
});

const mapDispatchToProps = (dispatch): Partial<INetworkEditorProps> => ({
    onLoad: versionId => versionId ? dispatch(fetchNetwork(versionId)) : dispatch(receiveNetwork(List(), List())),
    onEdit: () => dispatch(startEditing())
});

const NetworkEditorApp = connect(mapStateToProps, mapDispatchToProps)(NetworkEditor);

export default NetworkEditorApp;
