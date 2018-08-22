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
import * as Modal from 'react-modal';
import { TextInput, SelectInput, CheckboxInput, NumericInput, MultilineInput } from './inputs';
import { List } from 'immutable';
import { IOption } from './inputs';
import { ActivationType, LayerType, PoolingMode, Layer } from '../models';
import LayerForm from './LayerForm';

export interface IAddLayerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (layer: Layer) => void;
}

export interface IAddLayerState {
    readonly layer: Layer
}

export default class AddLayerDialog extends React.Component<IAddLayerProps, IAddLayerState> {
    private appElement = document.getElementById('network-editor');

    constructor(props) {
        super(props);

        this.save = this.save.bind(this);
        this.close = this.close.bind(this);

        this.state = {
            layer: this.getDefaultLayer()
        };
    }

    reset() {
        this.setState({ layer: this.getDefaultLayer() })
    }

    getDefaultLayer() {
        return new Layer({
            activation: ActivationType.ReLU,
            type: LayerType.Dense,
            poolingMode: PoolingMode.Average,
            kernelHeight: 1,
            kernelWidth: 1,
            kernelsNumber: 1,
            neuronsNumber: 1
        });
    }

    save() {
        this.props.onSave(this.state.layer);
        this.reset();
    }

    close() {
        this.props.onClose();
        this.reset();
    }

    public render() {
        return (
            <Modal isOpen={this.props.isOpen} appElement={this.appElement}>
                <div className="dialog-heading">
                    <h4>Add Layer</h4>
                </div>
                <div className="dialog-body">
                    <LayerForm layer={this.state.layer} onChange={l => this.setState({ layer: l })} isReadOnly={false} />
                </div>
                <div className="dialog-buttons">
                    <button className="button" onClick={this.close}>Cancel</button>
                    <button className="button-primary" onClick={this.save}>Add</button>
                </div>
            </Modal>
        );
    }
}
