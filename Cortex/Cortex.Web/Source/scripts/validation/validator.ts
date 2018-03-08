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