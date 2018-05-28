import Layer from "../models/Layer";
import LayerType from "../models/LayerType";
import ActivationType from "../models/ActivationType";

export default class EditLayerViewModel {
    public id: number;
    public name: string;
    public initial: Layer;
    public neuronsNumber: number;
    public activation: ActivationType;

    constructor(id: number, name: string, initial: Layer, neuronsNumber: number, activation: ActivationType) {
        this.id = id;
        this.name = name;
        this.initial = initial;
        this.neuronsNumber = neuronsNumber;
        this.activation = activation;
    }

    public static fromModel(layer: Layer): EditLayerViewModel {
        return new EditLayerViewModel(layer.id, layer.name, layer, layer.neuronsNumber, layer.activation);
    }

    public get typeName() {
        return LayerType[this.initial.type];
    }

    public get activationName() {
        return ActivationType[this.activation];
    }
}