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
    extends React.Component<IAddConnectionDialogProps, { record: AddConnectionDialogState }> {
    private appElement = document.getElementById('network-editor');

    constructor(props) {
        super(props);

        this.updateConnection = this.updateConnection.bind(this);

        this.state = { record: new AddConnectionDialogState() };
    }

    updateConnection(connection: Connection) {
        if (connection === null) {
            this.setState(prevState => ({ record: prevState.record.set('isValid', false) }));
        }
        else {
            this.setState(prevState => ({ record: prevState.record.set('isValid', true).set('connection', connection) }));
        }
    }

    public render() {
        return (
            <Modal isOpen={this.props.isOpen} appElement={this.appElement}>
                <div className="dialog-heading">
                    <h4>Add Connection</h4>
                </div>
                <div className="dialog-body">
                    <ValidatedConnectionForm connection={this.state.record.connection}
                        onChange={c => this.updateConnection(c)} />
                </div>
                <div className="dialog-buttons">
                    <button className="button" onClick={this.props.onClose}>Cancel</button>
                    <button className="button-primary"
                        onClick={() => this.props.onSave(this.state.record.connection)}
                        disabled={!this.state.record.isValid}>
                        Add
                    </button>
                </div>
            </Modal>
        );
    }
}
