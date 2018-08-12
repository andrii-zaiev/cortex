import * as React from 'react';

interface IOptionalNumber {
    selected: boolean,
    value: number
}

interface IOptionalNumericInputProps {
    label: string,
    value: IOptionalNumber,
    min: number,
    max: number,
    step: number,
    onChange: (value: IOptionalNumber) => void
}

const OptionalNumericInput = (props: IOptionalNumericInputProps) => (
    <div className="form-row">
        <label>{props.label}</label>
        <input type="checkbox"
            onChange={e => props.onChange({ selected: e.target.checked, value: e.target.checked ? props.value.value : null })} />
        <input type="number"
            min={props.min}
            max={props.max}
            step={props.step}
            value={props.value.value}
            onChange={e => props.onChange({ selected: props.value.selected, value: Number(e.target.value) })} />
    </div>
);

export default OptionalNumericInput;