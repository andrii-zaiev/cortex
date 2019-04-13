// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


import * as React from 'react';
import { Connection, Layer } from '../models';
import { List } from 'immutable';
import { SelectInput, IOption } from './inputs';
import { NewConnection } from '../models/Connection';

export interface IConnectionFormProps {
    connection: Connection,
    layers: List<Layer>,
    connections: List<Connection>,
    onChange: (connection: NewConnection) => void
}

const ConnectionForm = (props: IConnectionFormProps) => {
    const layerOptions: List<IOption> = props.layers.map(l => ({ value: l.id, label: l.name }));

    function validate(connection: Connection): NewConnection {
        const isSameLayer = connection.fromId === connection.toId;
        const isExistingConnection = props.connections
            .some(c => c.fromId === connection.fromId && c.toId === connection.toId);

        return new NewConnection({ connection: connection, isValid: !isSameLayer && !isExistingConnection });
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
                onChange={v => props.onChange(validate(props.connection.set('toId', v)))}
                isReadOnly={false} />
        </div>);
};

export default ConnectionForm;
