import Validator from './validator';

document.addEventListener('load', () => {
    const forms = document.querySelectorAll('form[data-validate]');
    const validators = [];

    for (let form of forms) {
        const v = new Validator(form as HTMLFormElement);
        validators.push(v);
    }
});