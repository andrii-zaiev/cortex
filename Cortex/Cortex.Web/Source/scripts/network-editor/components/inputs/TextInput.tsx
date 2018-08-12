import * as React from 'react';

interface ITextInputProps {
    label: string,
    value: string,
    onChange: (value: string) => void
}

const TextInput = (props: ITextInputProps) => (
    <div className="form-row">
        <label>{props.label}</label>
        <input type="text" value={props.value} onChange={e => props.onChange(e.target.value)} />
    </div>
);

export default TextInput;