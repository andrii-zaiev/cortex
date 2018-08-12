import * as React from 'react';
import { List } from 'immutable';

export interface IOption {
    label: string,
    value: any
}

interface ISelectInputProps {
    label: string,
    value: any,
    options: List<IOption>,
    onChange: (value: any) => void
}

const SelectInput = (props: ISelectInputProps) => {
    const options = props.options.map(op => <option value={op.value}>{op.label}</option>);

    return (
        <div className="form-row">
            <label>{props.label}</label>
            <select value={props.value} onChange={e => props.onChange(e.target.value)}>
                {options}
            </select>
        </div>
    )
};

export default SelectInput;