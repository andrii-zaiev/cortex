import * as React from 'react';
import * as Modal from 'react-modal';

import EventBus from '../shared/events/EventBus';
import { Message, MessageType } from '../shared/events/Message';

export default class ConfirmationDialog
    extends React.Component<{},
    { isOpen: boolean, url: string, text: string }> {
    private appElement = document.querySelector('body');

    constructor(props) {
        super(props);

        this.closeDialog = this.closeDialog.bind(this);
        this.onConfirmationRequested = this.onConfirmationRequested.bind(this);

        this.state = {
            isOpen: props.isOpen,
            url: '',
            text: ''
        };
    }

    public componentDidMount() {
        EventBus.subscribe(MessageType.ShowConfirmation, this.onConfirmationRequested);
    }

    public componentWillUnmount() {
        EventBus.unsubscribe(MessageType.ShowConfirmation, this.onConfirmationRequested);
    }

    private onConfirmationRequested(data) {
        this.setState(prevState => ({
            isOpen: true,
            url: data.url,
            text: data.text
        }));
    }

    private closeDialog() {
        this.setState(prevState => ({
            isOpen: false,
            url: prevState.url,
            text: prevState.text
        }));
    }

    public render() {
        return (
            <Modal isOpen={this.state.isOpen} appElement={this.appElement}>
                <div className="dialog-heading">
                    <h4>Confirmation</h4>
                </div>
                <div className="dialog-body">
                    <div className="confirmation-body">
                        <i className="fa fa-exclamation-triangle fa-3x"></i>
                        <div>{this.state.text}</div>
                    </div>
                </div>
                <form className="dialog-buttons" action={this.state.url} method="POST">
                    <div className="button" onClick={this.closeDialog}>No</div>
                    <button className="button-primary"
                        type="submit">
                        Yes
                    </button>
                </form>
            </Modal>
        );
    }
}
