import LayerViewModel from './LayerViewModel';
import Network from '../models/Network';

export default class NetworkViewModel {
    public layers: LayerViewModel[];
    public connections: any[];

    constructor(layers: LayerViewModel[], connections: any[]) {
        this.layers = layers;
        this.connections = connections;
    }

    public selectLayer(layer: LayerViewModel) {
        const newLayers: LayerViewModel[] = [].concat(this.layers);
        for (let l of newLayers) {
            l.isSelected = l.model.id == layer.model.id;
        }

        return new NetworkViewModel(newLayers, this.connections);
    }

    public deselectLayers() {
        const newLayers: LayerViewModel[] = [].concat(this.layers);
        for (let l of newLayers) {
            l.isSelected = false;
        }

        return new NetworkViewModel(newLayers, this.connections);
    }

    public static fromModel(network: Network) {
        return new NetworkViewModel(
            network.layers.map(l => new LayerViewModel(l)),
            network.connections);
    }
}