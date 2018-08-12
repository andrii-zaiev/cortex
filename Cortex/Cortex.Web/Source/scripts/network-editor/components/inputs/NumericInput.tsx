import * as React from 'react';

interface INumericInputProps {
    label: string,
    value: number,
    min: number,
    max: number,
    onChange: (value: number) => void
}

const NumericInput = (props: INumericInputProps) => (
    <div className="form-row">
        <label>{props.label}</label>
        <input type="number"
               min={props.min}
               max={props.max}
               step={1}
               value={props.value}
               onChange={e => props.onChange(Number(e.target.value))} />
    </div>
);

export default NumericInput;