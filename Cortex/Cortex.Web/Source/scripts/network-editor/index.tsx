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


import { render } from 'react-dom';
import * as React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk';
import NetworkEditorApp from './containers/NetworkEditorApp';

const element = document.getElementById('network-editor');

if (element) {
    const networkId = element.attributes['data-network-id'].value;
    const versionId = element.attributes['data-version-id'].value;
    const isReadOnlyString = element.attributes['data-is-read-only'].value;
    const isReadOnly = isReadOnlyString ? isReadOnlyString.toLowerCase() === 'true' : false;
    const isEditString = element.attributes['data-is-edit'].value;
    const isEdit = isEditString ? isEditString.toLowerCase() === 'true' : false;

    const initialState = { networkId, versionId, isReadOnly, isEdit };
    const store = createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware));

    render(
        <Provider store={store}>
            <NetworkEditorApp />
        </Provider>,
        element);
}
