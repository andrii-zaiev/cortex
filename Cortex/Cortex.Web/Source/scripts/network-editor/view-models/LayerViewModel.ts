﻿import Layer from '../models/Layer';

const layerWidth = 50;
const baseLayerHeight = 100;

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
        return layerWidth;
    }

    public get height(): number {
        return baseLayerHeight + this.model.neuronsNumber;
    }

    public get info(): string {
        //return this.model.activation;
        return 'ReLU';
    }

    public get size(): string {
        return this.model.neuronsNumber.toString();
    }
}