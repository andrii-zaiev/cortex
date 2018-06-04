import * as React from 'react';

import EditLayerViewModel from './view-models/EditLayerViewModel';
import EventBus from '../shared/events/EventBus';
import { MessageType, Message } from '../shared/events/Message';
import { SelectedItem, ItemType } from './models/SelectedItem';
import Network from './models/Network';
import LayerType from './models/LayerType';
import ActivationType from './models/ActivationType';
import Layer from './models/Layer';

class Props {
    public isEdit: boolean;
    public network: Network;
}

class State {
    public isVisible: boolean;
    public isEdit: boolean;
    public layer: EditLayerViewModel;
    public network: Network;
    public isModified: boolean;

    constructor(isVisible: boolean, isEdit: boolean, layer: EditLayerViewModel, network: Network, isModified: boolean) {
        this.isVisible = isVisible;
        this.isEdit = isEdit;
        this.layer = layer;
        this.network = network;
        this.isModified = isModified;
    }
}

export default class EditorToolbar
    extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onItemSelected = this.onItemSelected.bind(this);
        this.onLayerDeleted = this.onLayerDeleted.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.saveChanges = this.saveChanges.bind(this);

        this.state = new State(false, props.isEdit, null, props.network, false);
    }

    public componentDidMount() {
        EventBus.subscribe(MessageType.ItemSelected, this.onItemSelected);
        EventBus.subscribe(MessageType.DeleteLayer, this.onLayerDeleted);
    }

    public componentWillUnmount() {
        EventBus.unsubscribe(MessageType.ItemSelected, this.onItemSelected);
        EventBus.unsubscribe(MessageType.DeleteLayer, this.onLayerDeleted);
    }

    public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
        return new State(prevState.isVisible, nextProps.isEdit, prevState.layer, nextProps.network, prevState.isModified);
    }

    private onItemSelected(item: SelectedItem) {
        const isVisible = item && item.type === ItemType.Layer;

        let layer: EditLayerViewModel = null
        if (isVisible) {
            layer = EditLayerViewModel.fromModel(this.state.network.layers.find(l => l.id === item.id));
        }

        this.setState(prevState => new State(isVisible, prevState.isEdit, layer, prevState.network, false));
    }

    private onLayerDeleted(id: number) {
        if (this.state.isVisible && this.state.layer.id === id) {
            this.setState(prevState => new State(false, prevState.isEdit, null, prevState.network, false));
        }
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
        this.setState(prevState => new State(
            prevState.isVisible,
            prevState.isEdit,
            prevState.layer.clone().with(prop, value),
            prevState.network,
            true));
    }

    private cancelChanges() {
        this.setState(prevState => new State(
            prevState.isVisible,
            prevState.isEdit,
            prevState.layer.restoreInitial(),
            prevState.network,
            false
        ));
    }

    private saveChanges() {
        const layer = this.state.layer.toModel();

        this.setState(prevState => new State(
            prevState.isVisible,
            prevState.isEdit,
            EditLayerViewModel.fromModel(layer),
            prevState.network,
            false));

        EventBus.emit(new Message<Layer>(MessageType.UpdateLayer, layer));
    }

    public render(): React.ReactNode {
        if (this.state.isVisible) {
            if (this.state.isEdit) {
                return (
                    <div className="panel">
                        <div className="details-heading">
                            <h5>Layer Details</h5>
                            {this.state.isEdit && this.state.isModified &&
                                <div className="details-heading-buttons">
                                    <button title="Cancel"
                                        className="button-light button-icon"
                                        onClick={this.cancelChanges}>
                                        <i className="fa fa-close"></i>
                                    </button>
                                    <button title="Save"
                                        className="button-primary button-icon"
                                        onClick={this.saveChanges}>
                                        <i className="fa fa-save"></i>
                                    </button>
                                </div>
                            }
                        </div>
                        <div className="form-dense">
                            <div className="form-row">
                                <label>Name</label>
                                <input value={this.state.layer.name} onChange={e => this.update(e, 'name')} />
                            </div>
                            <div className="form-row">
                                <label>Type</label>
                                <span>{this.state.layer.typeName}</span>
                            </div>
                            <div className="form-row">
                                <label className="top-label">Comment</label>
                                <textarea></textarea>
                            </div>
                            {this.state.layer.type !== LayerType.Pooling &&
                                <div className="form-row">
                                    <label>Activation</label>
                                <select value={this.state.layer.activation} onChange={e => this.updateNumber(e, 'activation')}>
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
                                <input type="checkbox" />
                            </div>
                            <div className="form-row">
                                <label>Is output</label>
                                <input type="checkbox" />
                            </div>
                            {this.state.layer.initial.type == LayerType.Dense &&
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
                );
            } else {
                return (
                    <div className="panel">
                        <h5>Layer Details</h5>
                        <div className="form-dense">
                            <div className="form-row">
                                <label>Name</label>
                                <span>{this.state.layer.name}</span>
                            </div>
                            <div className="form-row">
                                <label>Type</label>
                                <span>{this.state.layer.typeName}</span>
                            </div>
                            <div className="form-row">
                                <label className="top-label">Comment</label>
                                <p></p>
                            </div>
                            {this.state.layer.type !== LayerType.Pooling &&
                                <div className="form-row">
                                    <label>Activation</label>
                                    <span>{this.state.layer.activationName}</span>
                                </div>
                            }
                            <div className="form-row">
                                <label>Is input</label>
                                <span>No</span>
                            </div>
                            <div className="form-row">
                                <label>Is output</label>
                                <span>No</span>
                            </div>
                            {this.state.layer.initial.type == LayerType.Dense &&
                                <div>
                                    <div className="form-row">
                                        <label>Neurons</label>
                                        <span>{this.state.layer.neuronsNumber}</span>
                                    </div>
                                    <div className="form-row">
                                        <label>Dropout</label>
                                        <span>No</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                );
            }
        }

        return null;
    }
}