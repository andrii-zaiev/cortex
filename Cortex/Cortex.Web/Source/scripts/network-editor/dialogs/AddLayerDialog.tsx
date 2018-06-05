import * as React from 'react';
import * as Modal from 'react-modal';

import NewLayerViewModel from '../view-models/NewLayerViewModel';
import LayerType from '../models/LayerType';
import Layer from '../models/Layer';
import EventBus from '../../shared/events/EventBus';
import { Message, MessageType } from '../../shared/events/Message';
import ActivationType from '../models/ActivationType';
import PoolingMode from '../models/PoolingMode';

export default class AddLayerDialog
    extends React.Component<{ isOpen: boolean, layerId: number }, { isOpen: boolean, layer: NewLayerViewModel, layerId: number }> {
    private appElement = document.getElementById('network-editor');

    constructor(props) {
        super(props);

        this.closeDialog = this.closeDialog.bind(this);
        this.update = this.update.bind(this);
        this.updateNumber = this.updateNumber.bind(this);
        this.updateValue = this.updateValue.bind(this);
        this.addLayer = this.addLayer.bind(this);

        this.state = { isOpen: props.isOpen, layer: NewLayerViewModel.init(), layerId: props.layerId };
    }

    public static getDerivedStateFromProps(nextProps, prevState) {
        return {
            isOpen: nextProps.isOpen,
            layer: prevState.layer,
            layerId: nextProps.layerId
        };
    }

    private closeDialog() {
        EventBus.emit(new Message<void>(MessageType.CloseAddDialog, null));
    }

    private update(event, prop: string) {
        const value = event.target.value;
        this.updateValue(prop, value);
    }

    private updateNumber(event, prop: string) {
        const value = Number(event.target.value);
        this.updateValue(prop, value);
    }

    private updateBoolean(event, prop: string) {
        const checked = event.target.checked;
        this.updateValue(prop, checked);
    }

    private updateValue(prop, value) {
        this.setState(prevState => ({
            isOpen: prevState.isOpen,
            layer: prevState.layer.clone().with(prop, value),
            layerId: prevState.layerId
        }));
    }

    private addLayer() {
        const layer = this.state.layer.toModel(this.state.layerId);
        this.setState(prevState => ({
            isOpen: prevState.isOpen,
            layer: NewLayerViewModel.init(),
            layerId: prevState.layerId
        }));
        EventBus.emit(new Message<Layer>(MessageType.NewLayer, layer));
    }

    public render() {
        return (
            <Modal isOpen={this.state.isOpen} appElement={this.appElement}>
                <div className="dialog-heading">
                    <h4>Add Layer</h4>
                </div>
                <div className="dialog-body">
                    <div className="form">
                        <div className="form-row">
                            <label>Name</label>
                            <input type="text" value={this.state.layer.name} onChange={e => this.update(e, 'name')}/>
                        </div>
                        <div className="form-row">
                            <label className="top-label">Comment</label>
                            <textarea value={this.state.layer.comment} onChange={e => this.update(e, 'comment')}></textarea>
                        </div>
                        {this.state.layer.type !== LayerType.Pooling &&
                            <div className="form-row">
                                <label>Activation</label>
                                <select value={this.state.layer.activation} onChange={e => this.update(e, 'activation')}>
                                    <option value={ActivationType.Softmax}> Softmax</option>
                                    <option value={ActivationType.ELU}>ELU</option>
                                    <option value={ActivationType.SELU}>SELU</option>
                                    <option value={ActivationType.Softplus}>Softplus</option>
                                    <option value={ActivationType.Softsign}>Softsign</option>
                                    <option value={ActivationType.ReLU}>ReLU</option>
                                    <option value={ActivationType.tanh}>tanh</option>
                                    <option value={ActivationType.Sigmoid}>Sigmoid</option>
                                    <option value={ActivationType.HardSigmoid}>Hard sigmoid</option>
                                    <option value={ActivationType.Linear}>Linear</option>
                                    <option value={ActivationType.Other}>Other</option>
                                </select>
                            </div>
                        }
                        <div className="form-row">
                            <label>Is input</label>
                            <input type="checkbox"
                                checked={this.state.layer.isInput}
                                onChange={e => this.updateBoolean(e, 'isInput')} />
                        </div>
                        <div className="form-row">
                            <label>Is output</label>
                            <input type="checkbox"
                                checked={this.state.layer.isOutput}
                                onChange={e => this.updateBoolean(e, 'isOutput')} />
                        </div>
                        <div className="form-row">
                            <label>Type</label>
                            <select value={this.state.layer.type} onChange={e => this.updateNumber(e, 'type')}>
                                <option value={LayerType.Dense}> Dense</option>
                                <option value={LayerType.Convolutional}>Convolutional</option>
                                <option value={LayerType.Pooling}>Pooling</option>
                                <option value={LayerType.Recurrent}>Recurrent</option>
                            </select>
                        </div>
                        {this.state.layer.type == LayerType.Dense && 
                        <div>
                            <div className="form-row">
                                <label>Neurons</label>
                                <input type="number"
                                    min={1}
                                    max={100000}
                                    step={1}
                                    value={this.state.layer.neuronsNumber}
                                    onChange={e => this.updateNumber(e, 'neuronsNumber')}/>
                            </div>
                            <div className="form-row">
                                <label>Dropout</label>
                                <input type="checkbox" />
                                <input type="number" min={0} max={1} step={0.05} />
                            </div>
                        </div>
                        }
                        {this.state.layer.type == LayerType.Convolutional &&
                            <div>
                                <div className="form-row">
                                    <label>Kernels</label>
                                <input type="number"
                                    min={1}
                                    max={100000}
                                    step={1}
                                    value={this.state.layer.kernelsNumber}
                                    onChange={e => this.updateNumber(e, 'kernelsNumber')}/>
                                </div>
                                <div className="form-row">
                                    <label>Width</label>
                                    <input type="number"
                                        min={1}
                                        max={1000}
                                        step={1}
                                        value={this.state.layer.kernelWidth}
                                    onChange={e => this.updateNumber(e, 'kernelWidth')} />
                                </div>
                                <div className="form-row">
                                    <label>Height</label>
                                    <input type="number"
                                        min={1}
                                        max={1000}
                                        step={1}
                                        value={this.state.layer.kernelHeight}
                                        onChange={e => this.updateNumber(e, 'kernelHeight')} />
                                </div>
                            </div>
                        }
                        {this.state.layer.type == LayerType.Pooling &&
                            <div>
                                <div className="form-row">
                                    <label>Mode</label>
                                    <select value={this.state.layer.poolingMode} onChange={e => this.updateNumber(e, 'poolingMode')}>
                                        <option value={PoolingMode.Max}>Max</option>
                                        <option value={PoolingMode.Average}>Average</option>
                                    </select>
                                </div>
                                <div className="form-row">
                                    <label>Width</label>
                                    <input type="number"
                                        min={1}
                                        max={1000}
                                        step={1}
                                        value={this.state.layer.kernelWidth}
                                        onChange={e => this.updateNumber(e, 'kernelWidth')} />
                                </div>
                                <div className="form-row">
                                    <label>Height</label>
                                    <input type="number"
                                        min={1}
                                        max={1000}
                                        step={1}
                                        value={this.state.layer.kernelHeight}
                                        onChange={e => this.updateNumber(e, 'kernelHeight')} />
                                </div>
                            </div>
                        }
                    </div>
                </div>
                <div className="dialog-buttons">
                    <button className="button" onClick={this.closeDialog}>Cancel</button>
                    <button className="button-primary" onClick={this.addLayer}>Add</button>
                </div>
            </Modal>
        );
    }
}
