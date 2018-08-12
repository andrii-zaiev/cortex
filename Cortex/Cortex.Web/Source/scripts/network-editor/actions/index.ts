﻿import { List, Record } from 'immutable';
import { Layer, Connection, SelectedItem, LayerUpdate, ILayer } from '../models/index';
import NetworkService from '../services/NetworkService';
import VersionDto from '../services/dtos/VersionDto';
import { ILayerUpdate } from '../models/Layer';
import { Action } from 'redux';
import { ItemType } from '../models/SelectedItem';

export enum ActionType {
    REQUEST_NETWORK = 'REQUEST_NETWORK',
    RECEIVE_NETWORK = 'RECEIVE_NETWORK',
    SAVE_VERSION = 'SAVE_VERSION',

    ADD_LAYER = 'ADD_LAYER',
    UPDATE_LAYER = 'UPDATE_LAYER',
    DELETE_LAYER = 'DELETE_LAYER',
    MOVE_LAYER = 'MOVE_LAYER',

    ADD_CONNECTION = 'ADD_CONNECTION',
    DELETE_CONNECTION = 'DELETE_CONNECTION',

    SELECT_ITEM = 'SELECT_ITEM',
    DESELECT_ITEM = 'DESELECT_ITEM',

    SHOW_ERROR = 'SHOW_ERROR',
    HIDE_ERROR = 'HIDE_ERROR',

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

export interface SaveVersionAction {
    type: ActionType.SAVE_VERSION
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

export interface ShowErrorAction {
    type: ActionType.SHOW_ERROR,
    error: string
}

export interface HideErrorAction {
    type: ActionType.HIDE_ERROR
}

export type Actions =
    | RequestNetworkAction
    | ReceiveNetworkAction
    | SaveVersionAction
    | AddLayerAction
    | UpdateLayerAction
    | DeleteLayerAction
    | MoveLayerAction
    | AddConnectionAction
    | DeleteConnectionAction
    | SelectItemAction
    | DeselectItemAction
    | ShowErrorAction
    | HideErrorAction;

export function requestNetwork(): RequestNetworkAction {
    return { type: ActionType.REQUEST_NETWORK };
}

export function receiveNetwork(layers: List<Layer>, connections: List<Connection>): ReceiveNetworkAction {
    return {
        type: ActionType.RECEIVE_NETWORK,
        layers: layers,
        connections: connections
    };
}

export function addLayer(layer: Partial<ILayer>): AddLayerAction {
    return {
        type: ActionType.ADD_LAYER,
        layer: new Layer(layer)
    };
}

export function updateLayer(id: number, layerUpdate: Partial<ILayerUpdate>): UpdateLayerAction {
    return {
        type: ActionType.UPDATE_LAYER,
        id,
        layer: new LayerUpdate(layerUpdate)
    };
}

export function moveLayer(id: number, dx: number, dy: number): MoveLayerAction {
    return {
        type: ActionType.MOVE_LAYER,
        id,
        dx,
        dy
    };
}

export function deleteLayer(id: number): DeleteLayerAction {
    return {
        type: ActionType.DELETE_LAYER,
        id
    };
}

export function addConnection(fromId: number, toId: number): AddConnectionAction {
    return {
        type: ActionType.ADD_CONNECTION,
        connection: new Connection({ fromId, toId })
    }
}

export function deleteConnection(id: number): DeleteConnectionAction {
    return {
        type: ActionType.DELETE_CONNECTION,
        id
    };
}

export function selectItem(id: number, type: ItemType): SelectItemAction {
    return {
        type: ActionType.SELECT_ITEM,
        item: new SelectedItem({ id, type })
    };
}

export function deselectItem(): DeselectItemAction {
    return {
        type: ActionType.DESELECT_ITEM
    };
}

export function showError(message: string): ShowErrorAction {
    return {
        type: ActionType.SHOW_ERROR,
        error: message
    };
}

export function hideError(): HideErrorAction {
    return {
        type: ActionType.HIDE_ERROR
    };
}

export function fetchNetwork(versionId: string) {
    return function (dispatch) {
        dispatch(requestNetwork());

        const networkService = new NetworkService();

        return networkService.getVersion(versionId)
            .then(
                network => {
                    const layers = List(network.layers).map(l => new Layer(l));
                    const connections = List(network.connections).map(c => new Connection(c));
                    dispatch(receiveNetwork(layers, connections));
                },
                error => dispatch(showError(error)));
    };
}

export function saveVersion(networkId: string, version: VersionDto) {
    return function (dispatch) {
        dispatch({ type: ActionType.SAVE_VERSION });

        const networkService = new NetworkService();

        return networkService.saveVersion(version)
            .then(
                versionId => {
                    const versionUrl = `${location.origin}/network/${networkId}/${versionId}`;
                    location.assign(versionUrl);
                },
                error => dispatch(showError(error)));
    };
}