import Connection from "../models/Connection";

export default class ConnectionViewModel {
    public model: Connection;
    public isSelected: boolean;

    constructor(model: Connection) {
        this.model = model;
        this.isSelected = false;
    }
}