import Layer from './Layer';
import Connection from './Connection';

export default class Network {
    public layers: Layer[];
    public connections: Connection[];

    constructor(layers: Layer[], connections: Connection[]) {
        this.layers = layers;
        this.connections = connections;
    }
}