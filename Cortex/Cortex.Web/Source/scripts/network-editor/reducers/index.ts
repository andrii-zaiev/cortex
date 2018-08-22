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


import { combineReducers } from 'redux';
import { Map, Record, Seq } from 'immutable';
import { Actions, ActionType, DeleteLayerAction, DeleteConnectionAction } from '../actions';
import { Layer, Connection, SelectedItem, LayerUpdate, ItemType } from '../models';

function noop<T>(def: T) {
    return (state: T = def, action: Actions) => state;
}

function getNewId(items: Map<number, any>) {
    return items.size > 0 ? items.keySeq().max() + 1 : 1;
}

function isLoaded(state: boolean = false, action: Actions): boolean {
    switch (action.type) {
        case ActionType.REQUEST_NETWORK:
            return false;
        case ActionType.RECEIVE_NETWORK:
            return true;
        default:
            return state;
    }
}

function isSaving(state: boolean = false, action: Actions): boolean {
    switch (action.type) {
        case ActionType.SAVE_VERSION:
            return true;
        default:
            return state;
    }
}

function isEdit(state: boolean = false, action: Actions): boolean {
    switch (action.type) {
        case ActionType.START_EDITING:
            return true;
        default:
            return state;
    }
}

function layers(state: Map<number, Layer> = Map(), action: Actions): Map<number, Layer> {
    switch (action.type) {
        case ActionType.RECEIVE_NETWORK:
            return action.layers
                .reduce(
                    (r, v) => r.set(v.get('id'), v),
                    Map());
        case ActionType.ADD_LAYER:
            const id = getNewId(state);
            return state.set(id, action.layer.set('id', id));
        case ActionType.UPDATE_LAYER:
            const layer = state.get(action.id).merge(action.layer);
            return state.set(action.id, layer);
        case ActionType.DELETE_LAYER:
            return state.delete(action.id);
        case ActionType.MOVE_LAYER:
            const movedLayer = state.get(action.id)
                .update('x', x => x + action.dx)
                .update('y', y => y + action.dy);
            return state.set(action.id, movedLayer);
        default:
            return state;
    }
}

function connections(state: Map<number, Connection> = Map(), action: Actions): Map<number, Connection> {
    switch (action.type) {
        case ActionType.RECEIVE_NETWORK:
            return action.connections
                .reduce(
                    (r, v) => r.set(v.get('id'), v),
                    Map());
        case ActionType.ADD_CONNECTION:
            const id = getNewId(state);
            return state.set(id, action.connection.set('id', id));
        case ActionType.DELETE_CONNECTION:
            return state.delete(action.id);
        case ActionType.DELETE_LAYER:
            return state
                .filter(c => c.get('fromId') !== action.id
                          && c.get('toId') !== action.id);
        default:
            return state;
    }
}

function handleSelectedItemDeletion(
    state: SelectedItem,
    action: DeleteLayerAction | DeleteConnectionAction,
    expectedType: ItemType): SelectedItem {
    if (state != null && state.type === expectedType && state.id === action.id) {
        return null;
    }
    return state;
}

function selectedItem(state: SelectedItem = null, action: Actions): SelectedItem {
    switch (action.type) {
        case ActionType.SELECT_ITEM:
            return action.item;
        case ActionType.DESELECT_ITEM:
            return null;
        case ActionType.DELETE_LAYER:
            return handleSelectedItemDeletion(state, action, ItemType.Layer);
        case ActionType.DELETE_CONNECTION:
            return handleSelectedItemDeletion(state, action, ItemType.Connection);
        default:
            return state;
    }
}

function error(state: string = null, action: Actions): string {
    switch (action.type) {
        case ActionType.SHOW_ERROR:
            return action.error;
        case ActionType.HIDE_ERROR:
            return null;
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    networkId: noop<string>(null),
    versionId: noop<string>(null),
    isLoaded,
    isSaving,
    isEdit,
    isReadOnly: noop <boolean>(false),
    layers,
    connections,
    selectedItem,
    error
});

export default rootReducer;
