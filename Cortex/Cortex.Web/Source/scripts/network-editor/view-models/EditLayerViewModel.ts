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

    public get type() {
        return this.initial.type;
    }

    public get activationName() {
        return ActivationType[this.activation];
    }

    public clone() {
        return new EditLayerViewModel(this.id, this.name, this.initial, this.neuronsNumber, this.activation);
    }

    public with(prop: string, value: any) {
        this[prop] = value;
        return this;
    }

    public restoreInitial() {
        return new EditLayerViewModel(
            this.id,
            this.initial.name,
            this.initial,
            this.initial.neuronsNumber,
            this.initial.activation);
    }


    public toModel(): Layer {
        return new Layer(
            this.initial.id,
            this.name,
            this.neuronsNumber,
            this.initial.type,
            this.initial.x,
            this.initial.y,
            this.activation,
            this.initial.kernelsNumber,
            this.initial.kernelWidth,
            this.initial.kernelHeight,
            this.initial.poolingMode);
    }
}