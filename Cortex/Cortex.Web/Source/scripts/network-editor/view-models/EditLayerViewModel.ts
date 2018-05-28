import Layer from "../models/Layer";
import LayerType from "../models/LayerType";

export default class EditLayerViewModel {
    public id: number;
    public name: string;
    public initial: Layer;
    public neuronsNumber: number;

    constructor(id: number, name: string, initial: Layer, neuronsNumber: number) {
        this.id = id;
        this.name = name;
        this.initial = initial;
        this.neuronsNumber = neuronsNumber;
    }

    public static fromModel(layer: Layer): EditLayerViewModel {
        return new EditLayerViewModel(layer.id, layer.name, layer, layer.neuronsNumber);
    }

    public get typeName() {
        return LayerType[this.initial.type];
    }
}