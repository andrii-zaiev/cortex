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

interface ICheckboxInputProps {
    label: string,
    value: boolean,
    isReadOnly: boolean,
    onChange: (value: boolean) => void
}

const CheckboxInput = (props: Partial<ICheckboxInputProps>) => (
    <div className="form-row">
        <label>{props.label}</label>
        {!props.isReadOnly && <input type="checkbox"
            checked={props.value}
            onChange={e => props.onChange(e.target.checked)} />}
        {props.isReadOnly && <span>{props.value ? 'Yes' : 'No'}</span>}
    </div>
);

export default CheckboxInput;
