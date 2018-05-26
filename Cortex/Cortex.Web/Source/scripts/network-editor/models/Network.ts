import Layer from './Layer';
import Connection from './Connection';

export default class Network {
    public layers: Layer[];
    public connections: Connection[];

    constructor(layers: Layer[], connections: Connection[]) {
        this.layers = layers;
        this.connections = connections;
    }

    public selectLayer(layer: Layer) {
        const newLayers: Layer[] = [].concat(this.layers);
        for (let l of newLayers) {
            l.isSelected = l.id == layer.id;
        }

        return new Network(newLayers, this.connections);
    }

    public deselectLayers() {
        const newLayers: Layer[] = [].concat(this.layers);
        for (let l of newLayers) {
            l.isSelected = false;
        }

        return new Network(newLayers, this.connections);
    }
}