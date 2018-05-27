import LayerType from "../models/LayerType";
import Layer from "../models/Layer";

export default class NewLayerViewModel {
    public name: string;
    public type: LayerType;
    public neuronsNumber: number;

    constructor(name: string, type: LayerType, neuronsNumber: number) {
        this.name = name;
        this.type = type;
        this.neuronsNumber = neuronsNumber;
    }

    public static init() {
        return new NewLayerViewModel('', LayerType.Dense, 1);
    }

    public clone() {
        return new NewLayerViewModel(this.name, this.type, this.neuronsNumber);
    }

    public with(prop: string, value: any) {
        this[prop] = value;
        return this;
    }

    public toModel(id: number) {
        return new Layer(id, this.name, this.neuronsNumber, this.type, 0, 0)
    }
}