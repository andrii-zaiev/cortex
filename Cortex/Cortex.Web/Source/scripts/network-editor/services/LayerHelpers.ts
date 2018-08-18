import { Layer, LayerType, PoolingMode, ActivationType, SelectedItem, ItemType } from "../models";

const layerWidth = 25;
const baseLayerHeight = 50;
const widthPerKernel = 10;
const heightPerNeuron = 10;
const sin45 = 0.7;

export function getWidth(layer: Layer) {
    if (layer.type === LayerType.Convolutional) {
        const multiplier = Math.log(layer.kernelsNumber);
        return widthPerKernel * (multiplier > 1 ? multiplier : 1);
    }

    if (layer.type === LayerType.Pooling) {
        return widthPerKernel;
    }

    return layerWidth;
}

export function getHeight(layer: Layer) {
    if (layer.type === LayerType.Convolutional
        || layer.type === LayerType.Pooling) {
        return baseLayerHeight + layer.kernelHeight;
    }

    const multiplier = Math.log(layer.neuronsNumber);
    return baseLayerHeight + heightPerNeuron * (multiplier > 1 ? multiplier : 1);
}

export function getDepth(layer: Layer) {
    if (is2d(layer)) {
        throw new Error('Unexpected depth calculations');
    }

    const h = baseLayerHeight + layer.kernelWidth;
    return h * sin45;
}

export function is2d(layer: Layer) {
    return layer.type === LayerType.Convolutional || layer.type === LayerType.Pooling;
}

export function getInfo(layer: Layer) {
    if (layer.type === LayerType.Pooling) {
        return `${PoolingMode[layer.poolingMode]}`;
    }

    return ActivationType[layer.activation];
}

export function getSize(layer: Layer) {
    if (layer.type === LayerType.Convolutional) {
        return `${layer.kernelWidth}x${layer.kernelHeight}x${layer.kernelsNumber}`;
    }

    if (layer.type === LayerType.Pooling) {
        return `${layer.kernelWidth}x${layer.kernelHeight}`;
    }

    return layer.neuronsNumber.toString();
}

export function isSelected(layer: Layer, selectedItem: SelectedItem) {
    return selectedItem && selectedItem.type === ItemType.Layer && selectedItem.id === layer.id;
}