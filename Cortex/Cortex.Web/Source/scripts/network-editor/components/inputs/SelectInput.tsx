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
    isReadOnly: boolean,
    onChange: (value: any) => void
}

const SelectInput = (props: Partial<ISelectInputProps>) => {
    const options = props.options.map(op => <option value={op.value}>{op.label}</option>);
    const selectedOption = props.options.find(op => op.value === props.value);
    const selectedLabel = selectedOption === null ? '' : selectedOption.label;

    return (
        <div className="form-row">
            <label>{props.label}</label>
            {!props.isReadOnly &&
                <select value={props.value} onChange={e => props.onChange(e.target.value)}>
                    {options}
                </select>}
            {props.isReadOnly && <span>{selectedLabel}</span>}
        </div>
    )
};

export default SelectInput;