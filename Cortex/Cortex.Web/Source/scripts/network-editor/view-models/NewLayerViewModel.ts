import LayerType from "../models/LayerType";

export default class NewLayerViewModel {
    public name: string;
    public type: LayerType;

    constructor(name: string, type: LayerType) {
        this.name = name;
        this.type = type;
    }

    public static init() {
        return new NewLayerViewModel('', LayerType.Dense);
    }
}