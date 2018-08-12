export enum ItemType {
    Layer,
    Connection
}

export class SelectedItem {
    public type: ItemType;
    public id: number;

    constructor(id: number, type: ItemType) {
        this.id = id;
        this.type = type;
    }
}