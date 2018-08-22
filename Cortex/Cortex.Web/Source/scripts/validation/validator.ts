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


export default class Validator {
    private submitButton: HTMLButtonElement;
    private form: HTMLFormElement;

    constructor(form: HTMLFormElement) {
        this.form = form;
        this.submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;

        const inputs = form.querySelectorAll('input,textarea');

        for (let input of inputs) {
            input.addEventListener('input', this.onInput.bind(this));
            input.addEventListener('blur', this.onBlur.bind(this));
        }

        this.updateSubmitButtonState();
    }

    private onInput(event: Event) {
        const input = event.srcElement as HTMLInputElement;

        if (input.classList.contains('invalid') && input.validity.valid) {
            input.classList.remove('invalid');
        }

        this.updateSubmitButtonState();
    }

    private onBlur(event: Event) {
        const input = event.srcElement as HTMLInputElement;

        if (!input.classList.contains('invalid') && !input.validity.valid) {
            input.classList.add('invalid');
        }

        this.updateSubmitButtonState();
    }

    private updateSubmitButtonState() {
        if (this.form.checkValidity()) {
            this.submitButton.removeAttribute('disabled');
        } else {
            this.submitButton.setAttribute('disabled', 'disabled');
        }
    }
}
