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

import { Record } from 'immutable';
import { MultilineInput } from './inputs/index';

export interface ISaveVersionDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (comment: string) => void;
    isSaving: boolean,
    error: string
}

interface ISaveVersionDialogState {
    comment: string
}

const SaveVersionDialogStateRecord = Record<ISaveVersionDialogState>({ comment: '' });

class SaveVersionDialogState extends SaveVersionDialogStateRecord {
    constructor(state: Partial<ISaveVersionDialogState> = {}) {
        super(state);
    }
}

export default class SaveVersionDialog
    extends React.Component<ISaveVersionDialogProps, { record: SaveVersionDialogState }> {
    private appElement = document.getElementById('network-editor');

    constructor(props) {
        super(props);

        this.updateComment = this.updateComment.bind(this);

        this.state = { record: new SaveVersionDialogState() };
    }

    private updateComment(comment: string) {
        this.setState(prevState => ({ record: prevState.record.set('comment', comment) }));
    }

    public render() {
        return (
            <Modal isOpen={this.props.isOpen} appElement={this.appElement}>
                <div className="dialog-heading">
                    <h4>Save Version</h4>
                </div>
                <div className="dialog-body">
                    <div className="form">
                        <MultilineInput value={this.state.record.comment} onChange={this.updateComment} label={'Comment'} />
                    </div>
                    {this.props.error && 
                        <div className="form-row">
                            <label className="error-text">{this.props.error}</label>
                        </div>}
                </div>
                <div className="dialog-buttons">
                    <button className="button" onClick={this.props.onClose}>Cancel</button>
                    <button className="button-primary" onClick={() => this.props.onSave(this.state.record.comment)}>Save</button>
                </div>
                {this.props.isSaving &&
                    <div className="fade">
                        <i className="fa fa-2x fa-spinner fa-spin spinner" />
                    </div>}
            </Modal>
        );
    }
}
