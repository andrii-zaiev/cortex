import { combineReducers } from 'redux';
import { Map, Record, Seq } from 'immutable';
import { Actions, ActionType } from '../actions';
import { Layer, Connection, SelectedItem, LayerUpdate } from '../models';

function noop<T>(def: T) {
    return (state: T = def, action: Actions) => state;
}

function getNewId(items: Map<number, any>) {
    return items.size > 0 ? items.keySeq().max() + 1 : 0;
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

function layers(state: Map<number, Layer> = Map(), action: Actions): Map<number, Layer> {
    switch (action.type) {
        case ActionType.RECEIVE_NETWORK:
            return action.layers
                .reduce(
                    (r, v) => r.set(v.get('id'), v),
                    Map());
        case ActionType.ADD_LAYER:
            const id = getNewId(state);
            return state.set(id, action.layer);
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
            return state.set(id, action.connection);
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

function selectedItem(state: SelectedItem = null, action: Actions): SelectedItem {
    switch (action.type) {
        case ActionType.SELECT_ITEM:
            return action.item;
        case ActionType.DESELECT_ITEM:
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
    layers,
    connections,
    selectedItem
});

export default rootReducer;