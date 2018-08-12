import { render } from 'react-dom';
import * as React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk';
import NetworkEditorApp from './components/NetworkEditorApp';

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