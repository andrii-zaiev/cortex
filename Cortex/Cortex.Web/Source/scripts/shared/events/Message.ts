export enum MessageType {
    NewLayer = 1,
    MoveLayer = 2,
    CloseAddDialog = 3,
    NewConnection = 4,
    CloseAddConnectionDialog = 5,
    ItemSelected = 6,
    DeleteLayer = 7,
    DeleteConnection = 8,
    CloseSaveDialog = 9,
    ShowConfirmation = 10,
    UpdateLayer = 11
}

export class Message<T> {
    public type: MessageType;
    public data: T;

    constructor(type: MessageType, data: T) {
        this.type = type;
        this.data = data;
    }
}