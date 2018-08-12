import * as React from 'react';
import * as Modal from 'react-modal';
import { TextInput, SelectInput, CheckboxInput, NumericInput, MultilineInput } from './inputs/index';
import { List } from 'immutable';
import { IOption } from './inputs';
import { ActivationType, LayerType, PoolingMode } from '../models';
import LayerForm from './LayerForm';
import { Layer } from '../models';

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

        this.state = { layer: new Layer() };
    }

    public render() {
        return (
            <Modal isOpen={this.props.isOpen} appElement={this.appElement}>
                <div className="dialog-heading">
                    <h4>Add Layer</h4>
                </div>
                <div className="dialog-body">
                    <LayerForm layer={this.state.layer} onChange={l => this.setState({ layer: l })} />
                </div>
                <div className="dialog-buttons">
                    <button className="button" onClick={this.props.onClose}>Cancel</button>
                    <button className="button-primary" onClick={() => this.props.onSave(this.state.layer)}>Add</button>
                </div>
            </Modal>
        );
    }
}
