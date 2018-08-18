import * as React from 'react';
import { connect } from 'react-redux';
import { RootState, Connection } from '../models';
import ConnectionForm, { IConnectionFormProps } from '../components/ConnectionForm';

export interface IValidatedConnectionFormProps {
    connection: Connection,
    onChange: (connection: Connection) => void
}

const mapStateToProps = (state: RootState, props: IValidatedConnectionFormProps): Partial<IConnectionFormProps> => ({
    connections: state.connections.valueSeq().toList(),
    layers: state.layers.valueSeq().toList(),
    connection: props.connection,
    onChange: props.onChange
});

const mapDispatchToProps = (dispatch): Partial<IConnectionFormProps> => ({});

const ValidateConnectionForm = connect(mapStateToProps, mapDispatchToProps)(ConnectionForm);

export default ValidateConnectionForm;