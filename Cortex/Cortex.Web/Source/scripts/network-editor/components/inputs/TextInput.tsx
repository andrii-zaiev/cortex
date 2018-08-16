import * as React from 'react';

interface ITextInputProps {
    label: string,
    value: string,
    isReadOnly: boolean,
    onChange: (value: string) => void
}

const TextInput = (props: Partial<ITextInputProps>) => (
    <div className="form-row">
        <label>{props.label}</label>
        {!props.isReadOnly && <input type="text" value={props.value} onChange={e => props.onChange(e.target.value)} />}
        {props.isReadOnly && <span>{props.value}</span>}
    </div>
);

export default TextInput;