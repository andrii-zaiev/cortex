// Cortex - web application for creating and managing neural networks diagrams.
// Copyright (C) 2018  Andrii Zaiev <andrii.zaiev@gmail.com>
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published
// by the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.


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
