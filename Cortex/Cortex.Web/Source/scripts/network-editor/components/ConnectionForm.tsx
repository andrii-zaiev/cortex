import * as React from 'react';
import { Connection, Layer } from '../models';
import { List } from 'immutable';
import { SelectInput, IOption } from './inputs';

export interface IConnectionFormProps {
    connection: Connection,
    layers: List<Layer>,
    connections: List<Connection>,
    onChange: (connection: Connection) => void
}

const ConnectionForm = (props: IConnectionFormProps) => {
    const layerOptions: List<IOption> = props.layers.map(l => ({ value: l.id, label: l.name }));

    function validate(connection: Connection): Connection {
        const isSameLayer = connection.fromId === connection.toId;
        if (isSameLayer) {
            return null;
        }

        const isExistingConnection = props.connections
            .some(c => c.fromId === connection.fromId && c.toId === connection.toId);
        if (isExistingConnection) {
            return null;
        }

        return connection;
    }

    return (
        <div className="form">
            <SelectInput label="From"
                value={props.connection.fromId}
                options={layerOptions}
                onChange={v => props.onChange(validate(props.connection.set('fromId', v)))}
                isReadOnly={false} />
            <SelectInput label="To"
                value={props.connection.toId}
                options={layerOptions}
                onChange={v => props.onChange(props.connection.set('toId', v))}
                isReadOnly={false} />
        </div>);
};

export ConnectionForm;