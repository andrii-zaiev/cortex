export enum MessageType {
    NewLayer,
    MoveLayer
}

export class Message<T> {
    public type: MessageType;
    public data: T;

    constructor(type: MessageType, data: T) {
        this.type = type;
        this.data = data;
    }
}