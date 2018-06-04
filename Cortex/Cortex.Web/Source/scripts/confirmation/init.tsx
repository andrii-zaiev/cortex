import * as ReactDOM from 'react-dom';
import * as React from 'react';

import EventBus from "../shared/events/EventBus";
import { Message, MessageType } from "../shared/events/Message";
import ConfirmationDialog from './ConfirmationDialog';

const confirmationButtons = document.querySelectorAll('button[data-confirmation]');

function setupCallback(element) {
    const button = element as HTMLButtonElement;
    const url = button.attributes['data-confirmation-url'].value;
    const text = button.attributes['data-confirmation-text'].value;
    button.addEventListener('click', () => {
        const message = new Message<any>(MessageType.ShowConfirmation, { url: url, text: text });
        EventBus.emit(message);
    });
}

if (confirmationButtons.length > 0) {
    confirmationButtons.forEach(b => setupCallback(b));

    const rootElement = document.createElement('div');
    const body = document.querySelector('body');
    body.appendChild(rootElement);

    ReactDOM.render(<ConfirmationDialog />, rootElement);
}