import { Record } from 'immutable';

export enum ItemType {
    Layer,
    Connection
}

export interface ISelectedItem {
    type: ItemType;
    id: number;
}

const SelectedItemRecord = Record({ id: null, type: null });

export class SelectedItem extends SelectedItemRecord implements ISelectedItem {
    constructor(props: Partial<ISelectedItem> = {}) {
        super(props);
    }
}