import * as React from 'react';
import * as Modal from 'react-modal';

import NewLayerViewModel from '../view-models/NewLayerViewModel';
import LayerType from '../models/LayerType';
import Layer from '../models/Layer';
import EventBus from '../events/EventBus';
import { Message, MessageType } from '../events/Message';

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

    private updateValue(prop, value) {
        this.setState(prevState => ({
            isOpen: prevState.isOpen,
            layer: prevState.layer.clone().with(prop, value),
            layerId: prevState.layerId
        }));
    }

    private addLayer() {
        const layer = this.state.layer.toModel(this.state.layerId);
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
                            <textarea></textarea>
                        </div>
                        <div className="form-row">
                            <label>Activation</label>
                            <select>
                                <option value={LayerType.Dense}> Softmax</option>
                                <option value={LayerType.Convolutional}>ELU</option>
                                <option value={LayerType.Pooling}>SELU</option>
                                <option value={LayerType.Recurrent}>Softplus</option>
                                <option value={LayerType.Recurrent}>Softsign</option>
                                <option value={LayerType.Recurrent}>ReLU</option>
                                <option value={LayerType.Recurrent}>tanh</option>
                                <option value={LayerType.Recurrent}>Sigmoid</option>
                                <option value={LayerType.Recurrent}>Hard sigmoid</option>
                                <option value={LayerType.Recurrent}>Linear</option>
                                <option value={LayerType.Recurrent}>Other</option>
                            </select>
                        </div>
                        <div className="form-row">
                            <label>Is input</label>
                            <input type="checkbox" />
                        </div>
                        <div className="form-row">
                            <label>Is output</label>
                            <input type="checkbox" />
                        </div>
                        <div className="form-row">
                            <label>Type</label>
                            <select value={this.state.layer.type} onChange={e => this.update(e, 'type')}>
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
