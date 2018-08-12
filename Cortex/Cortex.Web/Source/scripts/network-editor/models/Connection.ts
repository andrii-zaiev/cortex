import { Record } from 'immutable';

export interface IConnection {
    id: number;
    fromId: number;
    toId: number;
}

const ConnectionRecord = Record({ id: null, fromId: null, toId: null });

export class Connection extends ConnectionRecord implements IConnection {
    constructor(props: Partial<IConnection> = {}) {
        super(props);
    }
}