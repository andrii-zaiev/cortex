import * as React from 'react';

interface IMultilineInputProps {
    label: string,
    value: string,
    isReadOnly: boolean,
    onChange: (value: string) => void
}

const MultilineInput = (props: Partial<IMultilineInputProps>) => (
    <div className="form-row">
        <label className="top-label">{props.label}</label>
        {!props.isReadOnly && <textarea value={props.value} onChange={e => props.onChange(e.target.value)} />}
        {props.isReadOnly && <span>{props.value}</span>}
    </div>
);

export default MultilineInput;