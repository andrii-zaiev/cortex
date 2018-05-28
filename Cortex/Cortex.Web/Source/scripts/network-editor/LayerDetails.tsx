import * as React from 'react';

import EditLayerViewModel from './view-models/EditLayerViewModel';
import EventBus from './events/EventBus';
import { MessageType } from './events/Message';
import { SelectedItem, ItemType } from './models/SelectedItem';
import Network from './models/Network';
import LayerType from './models/LayerType';

class Props {
    public isEdit: boolean;
    public network: Network;
}

class State {
    public isVisible: boolean;
    public isEdit: boolean;
    public layer: EditLayerViewModel;
    public network: Network;

    constructor(isVisible: boolean, isEdit: boolean, layer: EditLayerViewModel, network: Network) {
        this.isVisible = isVisible;
        this.isEdit = isEdit;
        this.layer = layer;
        this.network = network;
    }
}

export default class EditorToolbar
    extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.onItemSelected = this.onItemSelected.bind(this);
        this.onLayerDeleted = this.onLayerDeleted.bind(this);

        this.state = new State(false, props.isEdit, null, props.network);
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
        return new State(prevState.isVisible, nextProps.isEdit, prevState.layer, nextProps.network);
    }

    private onItemSelected(item: SelectedItem) {
        const isVisible = item && item.type === ItemType.Layer;

        let layer: EditLayerViewModel = null
        if (isVisible) {
            layer = EditLayerViewModel.fromModel(this.state.network.layers.find(l => l.id === item.id));
        }

        this.setState(prevState => new State(isVisible, prevState.isEdit, layer, prevState.network));
    }

    private onLayerDeleted(id: number) {
        if (this.state.isVisible && this.state.layer.id === id) {
            this.setState(prevState => new State(false, prevState.isEdit, null, prevState.network));
        }
    }

    public render(): React.ReactNode {
        if (this.state.isVisible) {
            if (this.state.isEdit) {
                return (
                    <div className="panel">
                        <h5>Layer Details</h5>
                        <div className="form-dense">
                            <div className="form-row">
                                <label>Name</label>
                                <input value={this.state.layer.name} />
                            </div>
                            <div className="form-row">
                                <label>Type</label>
                                <span>{this.state.layer.typeName}</span>
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
                            {this.state.layer.initial.type == LayerType.Dense &&
                                <div>
                                    <div className="form-row">
                                        <label>Neurons</label>
                                        <input type="number"
                                            min={1}
                                            max={100000}
                                            step={1}
                                            value={this.state.layer.neuronsNumber} />
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
                            <div className="form-row">
                                <label>Activation</label>
                                <span>ReLU</span>
                            </div>
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