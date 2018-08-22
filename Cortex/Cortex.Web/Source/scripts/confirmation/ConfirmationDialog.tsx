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
