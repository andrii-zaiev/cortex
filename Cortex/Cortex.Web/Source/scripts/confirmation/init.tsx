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
