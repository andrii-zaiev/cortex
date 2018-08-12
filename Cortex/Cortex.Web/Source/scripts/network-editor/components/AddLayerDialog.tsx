import * as React from 'react';
import * as Modal from 'react-modal';
import { TextInput, SelectInput, CheckboxInput, NumericInput, MultilineInput } from './inputs/index';
import { List } from 'immutable';
import { IOption } from './inputs';
import { ActivationType, LayerType, PoolingMode } from '../models';

export interface IAddLayerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

export default class AddLayerDialog extends React.Component<IAddLayerProps, {}> {
    private appElement = document.getElementById('network-editor');

    constructor(props) {
        super(props);
    }

    public render() {
        const typeOptions: List<IOption> = List([
            { label: 'Dense', value: LayerType.Dense },
            { label: 'Convolutional', value: LayerType.Convolutional },
            { label: 'Pooling', value: LayerType.Pooling },
            //{ label: 'Recurrent', value: LayerType.Recurrent }
        ]);
        const activationOptions: List<IOption> = List([
            { label: 'ELU', value: ActivationType.ELU },
            { label: 'Hard sigmoid', value: ActivationType.HardSigmoid },
            { label: 'Linear', value: ActivationType.Linear },
            { label: 'Other', value: ActivationType.Other },
            { label: 'ReLU', value: ActivationType.ReLU },
            { label: 'SELU', value: ActivationType.SELU },
            { label: 'Sigmoid', value: ActivationType.Sigmoid },
            { label: 'Softmax', value: ActivationType.Softmax },
            { label: 'Softplus', value: ActivationType.Softplus },
            { label: 'Softsign', value: ActivationType.Softsign },
            { label: 'tanh', value: ActivationType.tanh }
        ]);
        const poolingOptions: List<IOption> = List([
            { label: 'Average', value: PoolingMode.Average },
            { label: 'Max', value: PoolingMode.Max }
        ]);

        return (
            <Modal isOpen={this.props.isOpen} appElement={this.appElement}>
                <div className="dialog-heading">
                    <h4>Add Layer</h4>
                </div>
                <div className="dialog-body">
                    <div className="form">
                        <TextInput label="Name" value="" onChange={v => { }} />
                        <MultilineInput label="Comment" value="" onChange={v => { }} />
                        <CheckboxInput label="Is input" value={false} onChange={v => { }} />
                        <CheckboxInput label="Is output" value={false} onChange={v => { }} />
                        <SelectInput label="Type" value="" options={typeOptions} onChange={v => { }} />

                        <SelectInput label="Activation" value="" options={activationOptions} onChange={v => { }} />
                        
                        {this.state.layer.type == LayerType.Dense && 
                            <div>
                                <NumericInput label="Neurons" value={0} min={1} max={100000} onChange={v => { }} />

                                //<div className="form-row">
                                //    <label>Dropout</label>
                                //    <input type="checkbox" />
                                //    <input type="number" min={0} max={1} step={0.05} />
                                //</div>
                            </div>
                        }
                        {this.state.layer.type == LayerType.Convolutional &&
                            <div>
                                <NumericInput label="Kernels" value={0} min={1} max={100000} onChange={v => { }} />
                                <NumericInput label="Width" value={0} min={1} max={1000} onChange={v => { }} />
                                <NumericInput label="Height" value={0} min={1} max={1000} onChange={v => { }} />
                            </div>
                        }
                        {this.state.layer.type == LayerType.Pooling &&
                            <div>
                                <SelectInput label="Mode" value="" options={poolingOptions} onChange={v => { }} />
                                <NumericInput label="Width" value={0} min={1} max={1000} onChange={v => { }} />
                                <NumericInput label="Height" value={0} min={1} max={1000} onChange={v => { }} />
                            </div>
                        }
                    </div>
                </div>
                <div className="dialog-buttons">
                    <button className="button" onClick={this.props.onClose}>Cancel</button>
                    <button className="button-primary" onClick={this.props.onSave}>Add</button>
                </div>
            </Modal>
        );
    }
}
