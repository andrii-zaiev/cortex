// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


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
    isReadOnly: boolean,
    onChange: (value: IOptionalNumber) => void
}

const OptionalNumericInput = (props: Partial<IOptionalNumericInputProps>) => (
    <div className="form-row">
        <label>{props.label}</label>
        {!props.isReadOnly && < input type="checkbox"
            onChange={e => props.onChange({ selected: e.target.checked, value: e.target.checked ? props.value.value : null })} />}
        {!props.isReadOnly && < input type="number"
            min={props.min}
            max={props.max}
            step={props.step}
            value={props.value.value}
            onChange={e => props.onChange({ selected: props.value.selected, value: Number(e.target.value) })} />}
        {props.isReadOnly && <span>{props.value && props.value.selected ? `Yes, ${props.value.value}` : 'No'}</span>}
    </div>
);

export default OptionalNumericInput;
