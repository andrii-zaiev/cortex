import Layer from '../models/Layer';

const layerWidth = 50;
const baseLayerHeight = 100;

export default class LayerViewModel {
    public model: Layer;
    public isSelected: boolean;

    constructor(layer: Layer) {
        this.model = layer;
        this.isSelected = false;
    }

    public get width(): number {
        return layerWidth;
    }

    public get height(): number {
        return baseLayerHeight + this.model.neuronsNumber;
    }
}