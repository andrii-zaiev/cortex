export enum MessageType {
    NewLayer = 1,
    MoveLayer = 2,
    CloseAddDialog = 3
}

export class Message<T> {
    public type: MessageType;
    public data: T;

    constructor(type: MessageType, data: T) {
        this.type = type;
        this.data = data;
    }
}