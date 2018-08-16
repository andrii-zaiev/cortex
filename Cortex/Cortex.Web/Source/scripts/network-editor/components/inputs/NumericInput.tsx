import * as React from 'react';

interface INumericInputProps {
    label: string,
    value: number,
    min: number,
    max: number,
    isReadOnly: boolean,
    onChange: (value: number) => void
}

const NumericInput = (props: Partial<INumericInputProps>) => (
    <div className="form-row">
        <label>{props.label}</label>
        {!props.isReadOnly && <input type="number"
            min={props.min}
            max={props.max}
            step={1}
            value={props.value}
            onChange={e => props.onChange(Number(e.target.value))} />}
        {props.isReadOnly && <span>{props.value}</span>}
    </div>
);

export default NumericInput;