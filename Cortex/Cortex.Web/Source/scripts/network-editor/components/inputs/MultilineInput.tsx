import * as React from 'react';

interface IMultilineInputProps {
    label: string,
    value: string,
    onChange: (value: string) => void
}

const MultilineInput = (props: IMultilineInputProps) => (
    <div className="form-row">
        <label>{props.label}</label>
        <textarea value={props.value} onChange={e => props.onChange(e.target.value)} />
    </div>
);

export default MultilineInput;