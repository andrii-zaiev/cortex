import LayerType from "../models/LayerType";
import Layer from "../models/Layer";
import ActivationType from "../models/ActivationType";

export default class NewLayerViewModel {
    public name: string;
    public type: LayerType;
    public neuronsNumber: number;
    public activation: ActivationType;

    constructor(name: string, type: LayerType, neuronsNumber: number, activation: ActivationType) {
        this.name = name;
        this.type = type;
        this.neuronsNumber = neuronsNumber;
        this.activation = activation;
    }

    public static init() {
        return new NewLayerViewModel('', LayerType.Dense, 1, ActivationType.Sigmoid);
    }

    public clone() {
        return new NewLayerViewModel(this.name, this.type, this.neuronsNumber, this.activation);
    }

    public with(prop: string, value: any) {
        this[prop] = value;
        return this;
    }

    public toModel(id: number) {
        return new Layer(id, this.name, this.neuronsNumber, this.type, 0, 0, this.activation)
    }
}