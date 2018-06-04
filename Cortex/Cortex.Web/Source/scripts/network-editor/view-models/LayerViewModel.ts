import Layer from '../models/Layer';
import ActivationType from '../models/ActivationType';
import LayerType from '../models/LayerType';
import PoolingMode from '../models/PoolingMode';

const layerWidth = 50;
const baseLayerHeight = 50;
const widthPerKernel = 10;
const sin45 = 0.7;

export default class LayerViewModel {
    public model: Layer;
    public isSelected: boolean;
    public isDragged: boolean;
    public drag: { x: number, y: number };

    constructor(layer: Layer) {
        this.model = layer;
        this.isSelected = false;
        this.isDragged = false;
        this.drag = { x: 0, y: 0 };
    }

    public get x(): number {
        return this.model.x + this.drag.x;
    }

    public get y(): number {
        return this.model.y + this.drag.y;
    }

    public get width(): number {
        if (this.model.type === LayerType.Convolutional) {
            return widthPerKernel * this.model.kernelsNumber;
        }

        if (this.model.type === LayerType.Pooling) {
            return widthPerKernel;
        }

        return layerWidth;
    }

    public get height(): number {
        if (this.model.type === LayerType.Convolutional
         || this.model.type === LayerType.Pooling) {
            return baseLayerHeight + this.model.kernelHeight;
        }

        return baseLayerHeight + this.model.neuronsNumber;
    }

    public get depth(): number {
        if (!this.is2d) {
            throw new Error('Unexpected depth calculations');
        }

        const h = baseLayerHeight + this.model.kernelWidth;
        return h * sin45;
    }

    public get info(): string {
        if (this.model.type === LayerType.Pooling) {
            return `${PoolingMode[this.model.poolingMode]} pooling`;
        }

        return ActivationType[this.model.activation];
    }

    public get size(): string {
        if (this.model.type === LayerType.Convolutional) {
            return `${this.model.kernelWidth}x${this.model.kernelHeight}x${this.model.kernelsNumber}`;
        }

        if (this.model.type === LayerType.Pooling) {
            return `${this.model.kernelWidth}x${this.model.kernelHeight}`;
        }

        return this.model.neuronsNumber.toString();
    }

    public get is2d(): boolean {
        return this.model.type === LayerType.Convolutional || this.model.type === LayerType.Pooling;
    }
}