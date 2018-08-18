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
    extends React.Component<ISaveVersionDialogProps, SaveVersionDialogState> {
    private appElement = document.getElementById('network-editor');

    constructor(props) {
        super(props);

        this.updateComment = this.updateComment.bind(this);

        this.state = new SaveVersionDialogState();
    }

    private updateComment(comment: string) {
        this.setState(prevState => prevState.set('comment', comment));
    }

    public render() {
        return (
            <Modal isOpen={this.props.isOpen} appElement={this.appElement}>
                <div className="dialog-heading">
                    <h4>Save Version</h4>
                </div>
                <div className="dialog-body">
                    <div className="form">
                        <MultilineInput value={this.state.comment} onChange={this.updateComment} label={'Comment'} />
                    </div>
                    {this.props.error && 
                        <div className="form-row">
                            <label className="error-text">{this.props.error}</label>
                        </div>}
                </div>
                <div className="dialog-buttons">
                    <button className="button" onClick={this.props.onClose}>Cancel</button>
                    <button className="button-primary" onClick={() => this.props.onSave(this.state.comment)}>Save</button>
                </div>
                {this.props.isSaving &&
                    <div className="fade">
                        <i className="fa fa-2x fa-spinner fa-spin spinner" />
                    </div>}
            </Modal>
        );
    }
}
