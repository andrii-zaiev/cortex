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
import { connect } from 'react-redux';
import { RootState, Connection } from '../models';
import ConnectionForm, { IConnectionFormProps } from '../components/ConnectionForm';
import { NewConnection } from '../models/Connection';

export interface IValidatedConnectionFormProps {
    connection: Connection,
    onChange: (connection: NewConnection) => void
}

const mapStateToProps = (state: RootState, props: IValidatedConnectionFormProps): Partial<IConnectionFormProps> => {
    return {
        connections: state.connections.valueSeq().toList(),
        layers: state.layers.valueSeq().toList(),
        connection: props.connection ? props.connection : new Connection({ fromId: state.layers.valueSeq().get(0).id, toId: state.layers.valueSeq().get(1).id }),
        onChange: props.onChange
    };
};

const mapDispatchToProps = (dispatch): Partial<IConnectionFormProps> => ({});

const ValidateConnectionForm = connect(mapStateToProps, mapDispatchToProps)(ConnectionForm);

export default ValidateConnectionForm;
