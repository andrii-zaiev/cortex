import * as React from 'react';
import * as Modal from 'react-modal';
import { Connection } from '../models';
import { Record } from 'immutable';
import ValidatedConnectionForm from '../containers/ValidatedConnectionForm';


export interface IAddConnectionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (connection: Connection) => void;
}

interface IAddConnectionDialogState {
    connection: Connection,
    isValid: boolean
}

const AddConnectionDialogStateRecord = Record<IAddConnectionDialogState>({ connection: new Connection(), isValid: false });

class AddConnectionDialogState extends AddConnectionDialogStateRecord {
    constructor(state: Partial<IAddConnectionDialogState> = {}) {
        super(state);
    }
}

export default class AddConnectionDialog
    extends React.Component<IAddConnectionDialogProps, AddConnectionDialogState> {
    private appElement = document.getElementById('network-editor');

    constructor(props) {
        super(props);

        this.updateConnection = this.updateConnection.bind(this);

        this.state = new AddConnectionDialogState();
    }

    updateConnection(connection: Connection) {
        if (connection === null) {
            this.setState(prevState => prevState.set('isValid', false));
        }
        else {
            this.setState(prevState => prevState.set('isValid', true).set('connection', connection));
        }
    }

    public render() {
        return (
            <Modal isOpen={this.props.isOpen} appElement={this.appElement}>
                <div className="dialog-heading">
                    <h4>Add Connection</h4>
                </div>
                <div className="dialog-body">
                    <ValidatedConnectionForm connection={this.state.connection}
                        onChange={c => this.updateConnection(c)} />
                </div>
                <div className="dialog-buttons">
                    <button className="button" onClick={this.props.onClose}>Cancel</button>
                    <button className="button-primary"
                        onClick={() => this.props.onSave(this.state.connection)}
                        disabled={!this.state.isValid}>
                        Add
                    </button>
                </div>
            </Modal>
        );
    }
}
