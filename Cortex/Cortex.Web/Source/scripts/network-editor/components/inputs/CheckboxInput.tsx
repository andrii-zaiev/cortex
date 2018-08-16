import * as React from 'react';

interface ICheckboxInputProps {
    label: string,
    value: boolean,
    isReadOnly: boolean,
    onChange: (value: boolean) => void
}

const CheckboxInput = (props: Partial<ICheckboxInputProps>) => (
    <div className="form-row">
        <label>{props.label}</label>
        {!props.isReadOnly && <input type="checkbox"
            checked={props.value}
            onChange={e => props.onChange(e.target.checked)} />}
        {props.isReadOnly && <span>{props.value ? 'Yes' : 'No'}</span>}
    </div>
);

export default CheckboxInput;