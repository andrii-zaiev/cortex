import * as React from 'react';

interface ICheckboxInputProps {
    label: string,
    value: boolean,
    onChange: (value: boolean) => void
}

const CheckboxInput = (props: ICheckboxInputProps) => (
    <div className="form-row">
        <label>{props.label}</label>
        <input type="checkbox"
            checked={props.value}
            onChange={e => props.onChange(e.target.checked)} />
    </div>
);

export default CheckboxInput;