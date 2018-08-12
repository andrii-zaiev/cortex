import Connection from "../models/Connection";

export default class NewConnectionViewModel {
    public fromId: number;
    public toId: number;

    constructor(fromId: number, toId: number) {
        this.fromId = fromId;
        this.toId = toId;
    }

    public toModel(connectionId: number) {
        return new Connection(connectionId, this.fromId, this.toId);
    }
}