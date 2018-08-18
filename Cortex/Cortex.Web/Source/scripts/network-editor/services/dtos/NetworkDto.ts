import { ILayer, IConnection } from "../../models";

export default class NetworkDto {
    layers: ILayer[];
    connections: IConnection[];

    constructor(layers: ILayer[], connections: IConnection[]) {
        this.layers = layers;
        this.connections = connections;
    }
}