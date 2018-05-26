import * as React from 'react';
import * as Modal from 'react-modal';

import NewLayerViewModel from '../view-models/NewLayerViewModel';
import LayerType from '../models/LayerType';

Modal.setAppElement('#network-editor');

export default class AddLayerDialog
    extends React.Component<{ isOpen: boolean }, { isOpen: boolean, layer: NewLayerViewModel }> {
    constructor(props) {
        super(props);

        this.closeDialog = this.closeDialog.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateType = this.updateType.bind(this);

        this.state = { isOpen: props.isOpen, layer: NewLayerViewModel.init() };
    }

    public static getDerivedStateFromProps(nextProps, prevState) {
        return {
            isOpen: nextProps.isOpen
        };
    }

    private closeDialog() {
        this.setState(prevState => ({ isOpen: false, layer: prevState.layer }));
    }

    private updateName(event) {
        const name = event.target.value;
        this.setState(prevState => ({
            isOpen: prevState.isOpen,
            layer: new NewLayerViewModel(name, prevState.layer.type)
        }));
    }

    private updateType(event) {
        const type = event.target.value;
        this.setState(prevState => ({
            isOpen: prevState.isOpen,
            layer: new NewLayerViewModel(prevState.layer.name, type)
        }));
    }

    public render() {
        return (
            <Modal isOpen={this.state.isOpen}>
                <div className="dialog-heading">
                    <h4>Add Layer</h4>
                </div>
                <div className="dialog-body">
                    <div className="form">
                        <div className="form-row">
                            <label>Name</label>
                            <input type="text" value={this.state.layer.name} onChange={this.updateName}/>
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
                            <select value={this.state.layer.type} onChange={this.updateType}>
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
                                <input type="number" min={1} max={100000} step={1} />
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
                    <button className="button-primary">Add</button>
                </div>
            </Modal>
        );
    }
}
