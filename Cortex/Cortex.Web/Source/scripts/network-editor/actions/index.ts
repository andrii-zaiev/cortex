import { List, Record } from 'immutable';
import { Layer, Connection, SelectedItem, LayerUpdate } from '../models/index';

export enum ActionType {
    REQUEST_NETWORK = 'REQUEST_NETWORK',
    RECEIVE_NETWORK = 'RECEIVE_NETWORK',

    ADD_LAYER = 'ADD_LAYER',
    UPDATE_LAYER = 'UPDATE_LAYER',
    DELETE_LAYER = 'DELETE_LAYER',
    MOVE_LAYER = 'MOVE_LAYER',

    ADD_CONNECTION = 'ADD_CONNECTION',
    DELETE_CONNECTION = 'DELETE_CONNECTION',

    SELECT_ITEM = 'SELECT_ITEM',
    DESELECT_ITEM = 'DESELECT_ITEM',

    OTHER = 'OTHER'
}

export interface RequestNetworkAction {
    type: ActionType.REQUEST_NETWORK
}

export interface ReceiveNetworkAction {
    type: ActionType.RECEIVE_NETWORK,
    layers: List<Layer>,
    connections: List<Connection>
}

export interface AddLayerAction {
    type: ActionType.ADD_LAYER,
    layer: Layer
}

export interface UpdateLayerAction {
    type: ActionType.UPDATE_LAYER,
    id: number,
    layer: LayerUpdate
}

export interface DeleteLayerAction {
    type: ActionType.DELETE_LAYER,
    id: number
}

export interface MoveLayerAction {
    type: ActionType.MOVE_LAYER,
    id: number,
    dx: number,
    dy: number
}

export interface AddConnectionAction {
    type: ActionType.ADD_CONNECTION,
    connection: Connection
}

export interface DeleteConnectionAction {
    type: ActionType.DELETE_CONNECTION,
    id: number
}

export interface SelectItemAction {
    type: ActionType.SELECT_ITEM,
    item: SelectedItem
}

export interface DeselectItemAction {
    type: ActionType.DESELECT_ITEM
}

export type Actions =
    | RequestNetworkAction
    | ReceiveNetworkAction
    | AddLayerAction
    | UpdateLayerAction
    | DeleteLayerAction
    | MoveLayerAction
    | AddConnectionAction
    | DeleteConnectionAction
    | SelectItemAction
    | DeselectItemAction;