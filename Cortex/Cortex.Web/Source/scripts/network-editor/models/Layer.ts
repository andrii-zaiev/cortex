import ActivationType from './ActivationType';
import LayerType from './LayerType';
import PoolingMode from './PoolingMode';
import { Record } from 'immutable';

export interface ILayer {
    id: number;
    name: string;
    x: number;
    y: number;
    comment: string;
    isInput: boolean;
    isOutput: boolean;
    type: LayerType,
    neuronsNumber: number,
    activation: ActivationType;
    kernelsNumber: number;
    kernelWidth: number;
    kernelHeight: number;
    poolingMode: PoolingMode;
}

const LayerRecord = Record<ILayer>({
    id: null,
    name: '',
    x: null,
    y: null,
    comment: '',
    isInput: false,
    isOutput: false,
    type: null,
    neuronsNumber: null,
    activation: null,
    kernelsNumber: null,
    kernelHeight: null,
    kernelWidth: null,
    poolingMode: null
});

export class Layer extends LayerRecord implements ILayer {
    constructor(props: Partial<ILayer> = {}) {
        super(props);
    }
}

export interface ILayerUpdate {
    name: string;
    comment: string;
    isInput: boolean;
    isOutput: boolean;
    activation: ActivationType;
    kernelsNumber: number;
    kernelWidth: number;
    kernelHeight: number;
    poolingMode: PoolingMode;
}

const LayerUpdateRecord = Record<ILayerUpdate>({
    name: '',
    comment: '',
    isInput: false,
    isOutput: false,
    activation: null,
    kernelsNumber: null,
    kernelHeight: null,
    kernelWidth: null,
    poolingMode: null
});

export class LayerUpdate extends LayerUpdateRecord implements ILayerUpdate {
    constructor(props: Partial<ILayer> = {}) {
        super(props);
    }
}