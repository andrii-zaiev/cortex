import Layer from './Layer';

export default class Connection {
    public id: number;
    public fromId: number;
    public toId: number;

    constructor(id: number, fromId: number, toId: number) {
        this.id = id;
        this.fromId = fromId;
        this.toId = toId;
    }
}