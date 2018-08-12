import { ILayer, IConnection } from "../../models";

export default class NetworkDto {
    layers: ILayer[];
    connections: IConnection[];
}