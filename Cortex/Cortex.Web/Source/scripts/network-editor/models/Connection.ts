import { Record } from 'immutable';

export interface IConnection {
    id: number;
    fromId: number;
    toId: number;
}

const ConnectionRecord = Record({ id: 0, fromId: 0, toId: 0 });

export class Connection extends ConnectionRecord implements IConnection {
    constructor(props: Partial<IConnection> = {}) {
        super(props);
    }
}