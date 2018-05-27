import LayerViewModel from './LayerViewModel';
import Network from '../models/Network';
import EventBus from '../events/EventBus';
import { Message, MessageType } from '../events/Message';
import ConnectionViewModel from './ConnectionViewModel';

export default class NetworkViewModel {
    public layers: LayerViewModel[];
    public connections: ConnectionViewModel[];

    constructor(layers: LayerViewModel[], connections: ConnectionViewModel[]) {
        this.layers = layers;
        this.connections = connections;
    }

    public selectLayer(layer: LayerViewModel) {
        const newLayers: LayerViewModel[] = [].concat(this.layers);
        for (let l of newLayers) {
            l.isSelected = l.model.id == layer.model.id;
        }
        const newConnections: ConnectionViewModel[] = [].concat(this.connections);
        for (let c of newConnections) {
            c.isSelected = false;
        }

        return new NetworkViewModel(newLayers, newConnections);
    }

    public deselectAll() {
        const newLayers: LayerViewModel[] = [].concat(this.layers);
        for (let l of newLayers) {
            l.isSelected = false;
        }

        const newConnections: ConnectionViewModel[] = [].concat(this.connections);
        for (let c of newConnections) {
            c.isSelected = false;
        }

        return new NetworkViewModel(newLayers, newConnections);
    }

    public startLayerDragging(layer: LayerViewModel) {
        const newLayers: LayerViewModel[] = [].concat(this.layers);
        for (let l of newLayers) {
            l.isDragged = l.model.id == layer.model.id;
        }

        return new NetworkViewModel(newLayers, this.connections);
    }

    public dragLayer(layer: LayerViewModel, dx: number, dy: number) {
        const newLayers: LayerViewModel[] = [].concat(this.layers);
        for (let l of newLayers) {
            if (l.model.id == layer.model.id) {
                l.drag = { x: l.drag.x + dx, y: l.drag.y + dy };
            }
        }

        return new NetworkViewModel(newLayers, this.connections);
    }

    public dropLayer(layer: LayerViewModel) {
        const newLayers: LayerViewModel[] = [].concat(this.layers);
        for (let l of newLayers) {
            if (l.model.id == layer.model.id) {
                l.isDragged = false;
                EventBus.emit(new Message(MessageType.MoveLayer, { id: l.model.id, dx: l.drag.x, dy: l.drag.y }));
            }
        }

        return new NetworkViewModel(newLayers, this.connections);
    }

    public selectConnection(connection: ConnectionViewModel) {
        const newLayers: LayerViewModel[] = [].concat(this.layers);
        for (let l of newLayers) {
            l.isSelected = false;
        }

        const newConnections: ConnectionViewModel[] = [].concat(this.connections);
        for (let c of newConnections) {
            c.isSelected = c.model.id == connection.model.id;
        }

        return new NetworkViewModel(newLayers, newConnections);
    }

    public static fromModel(network: Network) {
        return new NetworkViewModel(
            network.layers.map(l => new LayerViewModel(l)),
            network.connections.map(c => new ConnectionViewModel(c)));
    }
}