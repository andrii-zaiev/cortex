import * as React from 'react';
import * as d3 from 'd3';

import { Record, Map } from 'immutable';
import { Layer, Connection, LayerType, SelectedItem, ItemType } from '../models/index';
import { getDepth, getHeight, getInfo, getSize, getWidth, is2d, isSelected } from '../services/LayerHelpers';

const d3RootId: string = 'd3-root';
const labelFontSize = 15;

export interface INetworkDisplayAreaProps {
    isEdit: boolean,
    layers: Layer[],
    connections: Connection[],
    selectedItem: SelectedItem,
    onSelect: (item: SelectedItem) => void,
    onDeselect: () => void,
    onMoveLayer: (id: number, dx: number, dy: number) => void
}

interface IGrabbingState {
    isActive: boolean;
    prevX: number;
    prevY: number;
    cursor: string;
}

const GrabbingStateRecord = Record<IGrabbingState>({ isActive: false, prevX: 0, prevY: 0, cursor: '-webkit-drag' });

class GrabbingState extends GrabbingStateRecord {
    constructor(grabbing: Partial<IGrabbingState> = {}) {
        super(grabbing);
    }
}

interface IDraggingState {
    isActive: boolean,
    layerId: number,
    dx: number,
    dy: number
}

const DraggingStateRecord = Record<IDraggingState>({ isActive: false, layerId: 0, dx: 0, dy: 0 });

class DraggingState extends DraggingStateRecord {
    constructor(dragging: Partial<IDraggingState> = {}) {
        super(dragging);
    }
}

interface INetworkDisplayAreaState {
    translate: { x: number, y: number };
    scale: number;
    grabbing: GrabbingState;
    dragging: DraggingState;
}

const NetworkDisplayAreaStateRecord = Record<INetworkDisplayAreaState>({
    translate: { x: 0, y: 0 },
    scale: 1,
    grabbing: new GrabbingState(),
    dragging: new DraggingState()
});

class NetworkDisplayAreaState extends NetworkDisplayAreaStateRecord {
    constructor(state: Partial<INetworkDisplayAreaState> = {}) {
        super(state);
    }
}

export default class NetworkDisplayArea
    extends React.Component<INetworkDisplayAreaProps, NetworkDisplayAreaState> {

    constructor(props: INetworkDisplayAreaProps) {
        super(props);

        this.updateScale = this.updateScale.bind(this);
        this.startGrabbing = this.startGrabbing.bind(this);
        this.translate = this.translate.bind(this);
        this.endGrabbing = this.endGrabbing.bind(this);
        this.selectLayer = this.selectLayer.bind(this);
        this.deselectAll = this.deselectAll.bind(this);
        this.startLayerDragging = this.startLayerDragging.bind(this);
        this.dragLayer = this.dragLayer.bind(this);
        this.dropLayer = this.dropLayer.bind(this);
        this.selectConnection = this.selectConnection.bind(this);

        this.state = new NetworkDisplayAreaState();
    }

    componentDidMount() {
        this.draw();
    }

    componentDidUpdate() {
        this.draw();
    }

    private draw(): void {
        const svg = d3.select(`#${d3RootId}`)
            .on('mousemove', this.dragLayer)
            .on('mouseup', this.dropLayer);

        this.drawLayers(svg);
        this.drawConnections(svg);
    }

    private drawLayers(svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>) {
        const layerGroup = svg.selectAll('g')
            .data(this.props.layers, l => (l as Layer).id.toString());
        const layerRect = this.updateLayerRects(layerGroup.select('rect#front'));
        const layerTopRect = this.update2dLayerTop(layerGroup.select('polygon#top'));
        const layerSideRect = this.update2dLayerSide(layerGroup.select('polygon#side'));
        const layerLabel = this.updateLayerLabels(layerGroup.select('text'));
        const layerNameLabel = this.updateNameLabels(layerLabel.select('tspan#name'));
        const layerInfoLabel = this.updateInfoLabels(layerLabel.select('tspan#info'));
        const layerSizeLabel = this.updateSizeLabels(layerLabel.select('tspan#size'));

        // Enter…
        const groupEnter = layerGroup.enter().append('g');
        this.updateLayerRects(groupEnter.append('rect')
            .attr('id', 'front')
            .style('stroke', 'black')
            .style('stroke-width', 2)
            .on('click', l => this.selectLayer(l))
            .on('mousedown', l => this.startLayerDragging(l)));

        const layer2dGroupEnter = groupEnter.filter(l => l.type === LayerType.Convolutional
                                                      || l.type == LayerType.Pooling);
        this.update2dLayerTop(layer2dGroupEnter.append('polygon')
            .attr('id', 'top')
            .style('stroke', 'black')
            .style('stroke-width', 2)
            .on('click', l => this.selectLayer(l))
            .on('mousedown', l => this.startLayerDragging(l)));
        this.update2dLayerSide(layer2dGroupEnter.append('polygon')
            .attr('id', 'side')
            .style('stroke', 'black')
            .style('stroke-width', 2)
            .on('click', l => this.selectLayer(l))
            .on('mousedown', l => this.startLayerDragging(l)));

        const layerEnter = this.updateLayerLabels(groupEnter.append('text'));
        this.updateNameLabels(layerEnter.append('tspan').attr('id', 'name').attr('dy', '1.2em'));
        this.updateInfoLabels(layerEnter.append('tspan').attr('id', 'info').attr('dy', '1.2em'));
        this.updateSizeLabels(layerEnter.append('tspan').attr('id', 'size').attr('dy', '1.2em'));

        // Exit…
        layerGroup.exit().remove();
    }

    private updateLayerRects(layerRect: d3.Selection<d3.BaseType, Layer, d3.BaseType, {}>) {
        return layerRect
            .attr('width', l => getWidth(l) * this.state.scale)
            .attr('height', l => getHeight(l) * this.state.scale)
            .attr('x', l => this.convertX(l.x))
            .attr('y', l => this.convertY(l.y))
            .style('fill', l => isSelected(l, this.props.selectedItem) ? 'lightgray' : 'white')
            .style('cursor', l => isSelected(l, this.props.selectedItem) && this.props.isEdit ? 'move' : 'pointer');
    }

    private update2dLayerTop(polygon: d3.Selection<d3.BaseType, Layer, d3.BaseType, {}>) {
        return polygon
            .attr('points', l => {
                const points = [
                    `${this.convertX(l.x)},${this.convertY(l.y)}`,
                    `${this.convertX(l.x + getWidth(l))},${this.convertY(l.y)}`,
                    `${this.convertX(l.x + getWidth(l) + getDepth(l))},${this.convertY(l.y - getDepth(l))}`,
                    `${this.convertX(l.x + getDepth(l))},${this.convertY(l.y - getDepth(l))}`
                ];

                return points.join(' ');
            })
            .style('fill', l => this.props.selectedItem
                && this.props.selectedItem.type === ItemType.Layer
                && this.props.selectedItem.id === l.id
                ? 'lightgray'
                : 'white')
            .style('cursor', l => this.props.selectedItem
                && this.props.selectedItem.type === ItemType.Layer
                && this.props.selectedItem.id === l.id
                && this.props.isEdit
                ? 'move'
                : 'pointer');
    }

    private update2dLayerSide(polygon: d3.Selection<d3.BaseType, Layer, d3.BaseType, {}>) {
        return polygon
            .attr('points', l => {
                const points = [
                    `${this.convertX(l.x + getWidth(l))},${this.convertY(l.y)}`,
                    `${this.convertX(l.x + getWidth(l))},${this.convertY(l.y + getHeight(l))}`,
                    `${this.convertX(l.x + getWidth(l) + getDepth(l))},${this.convertY(l.y + getHeight(l) - getDepth(l))}`,
                    `${this.convertX(l.x + getWidth(l) + getDepth(l))},${this.convertY(l.y - getDepth(l))}`
                ];

                return points.join(' ');
            })
            .style('fill', l => this.props.selectedItem
                && this.props.selectedItem.type === ItemType.Layer
                && this.props.selectedItem.id === l.id
                ? 'lightgray'
                : 'white')
            .style('cursor', l => this.props.selectedItem
                && this.props.selectedItem.type === ItemType.Layer
                && this.props.selectedItem.id === l.id
                && this.props.isEdit
                ? 'move'
                : 'pointer');
    }

    private updateLayerLabels(layerLabel: d3.Selection<d3.BaseType, Layer, d3.BaseType, {}>) {
        return layerLabel
            .attr('x', l => is2d(l)
                ? this.convertX(l.x + getDepth(l))
                : this.convertX(l.x))
            .attr('y', l => is2d(l)
                ? this.convertY(l.y - getDepth(l) - 60)
                : this.convertY(l.y - 60))
            .attr('font-size', () => labelFontSize * this.state.scale);
    }

    private convertX(x: number) {
        return x * this.state.scale + this.state.translate.x;
    }

    private convertY(y: number) {
        return y * this.state.scale + this.state.translate.y;
    }

    private updateNameLabels(label: d3.Selection<d3.BaseType, Layer, d3.BaseType, {}>) {
        return label
            .attr('x', l => is2d(l)
                ? this.convertX(l.x + getDepth(l))
                : this.convertX(l.x))
            .text(l => l.name);
    }

    private updateInfoLabels(label: d3.Selection<d3.BaseType, Layer, d3.BaseType, {}>) {
        return label
            .attr('x', l => is2d(l)
                ? this.convertX(l.x + getDepth(l))
                : this.convertX(l.x))
            .text(l => getInfo(l));
    }

    private updateSizeLabels(label: d3.Selection<d3.BaseType, Layer, d3.BaseType, {}>) {
        return label
            .attr('x', l => is2d(l)
                ? this.convertX(l.x + getDepth(l))
                : this.convertX(l.x))
            .text(l => getSize(l));
    }

    private drawConnections(svg: d3.Selection<d3.BaseType, {}, HTMLElement, any>) {
        const line = this.updateLines(svg.selectAll('line')
            .data(this.props.connections, l => (l as Connection).id.toString()));

        this.updateLines(line.enter().append('line')
            .style('cursor', 'pointer')
            .on('click', c => this.selectConnection(c)));

        line.exit().remove();
    }

    private updateLines(connection: d3.Selection<d3.BaseType, Connection, d3.BaseType, {}>) {
        const layersMap = this.props.layers.reduce(
            (r, v) => r.set(v.get('id'), v),
            Map<number, Layer>());

        return connection
            .attr('x1', c => {
                const from = layersMap.get(c.fromId);
                return is2d(from)
                    ? this.convertX(from.x + getWidth(from) + getDepth(from) / 2)
                    : this.convertX(from.x + getWidth(from));
            })
            .attr('y1', c => {
                const from = layersMap.get(c.fromId);
                return is2d(from)
                    ? this.convertY(from.y + getHeight(from) / 2 - getDepth(from) / 2)
                    : this.convertY(from.y + getHeight(from) / 2);
            })
            .attr('x2', c => this.convertX(layersMap.get(c.toId).x))
            .attr('y2', c => this.convertY(layersMap.get(c.toId).y + getHeight(layersMap.get(c.toId)) / 2))
            .style('stroke', c => this.props.selectedItem
                && this.props.selectedItem.type === ItemType.Connection
                && this.props.selectedItem.id === c.id
                ? 'red'
                : 'black')
            .style('stroke-width', 5)
    }

    private selectConnection(connection: Connection) {
        d3.event.stopPropagation();

        this.props.onSelect(new SelectedItem({ id: connection.id, type: ItemType.Connection }));
    }

    private updateScale(event): void {
        event.stopPropagation();
        event.preventDefault();
        const scrollAmount = event.deltaY;
        const scaleUpdate = -scrollAmount / 1000;
        this.setState(prevState => prevState
            .set('scale', prevState.scale + scaleUpdate > 0
                ? prevState.scale + scaleUpdate
                : 0.01));
    }

    private startGrabbing(x, y) {
        this.setState(prevState => prevState.set('grabbing',
            prevState.grabbing
                .set('isActive', true)
                .set('prevX', x)
                .set('prevY', y)
                .set('cursor', '-webkit-grabbing')));
    }

    private translate(newX, newY) {
        if (this.state.grabbing.isActive) {
            const deltaX = newX - this.state.grabbing.prevX;
            const deltaY = newY - this.state.grabbing.prevY;

            this.setState(prevState => prevState.set('translate',
                { x: prevState.translate.x + deltaX, y: prevState.translate.y + deltaY }));
        }
    }

    private endGrabbing() {
        this.setState(prevState => prevState.set('grabbing',
            prevState.grabbing
                .set('isActive', false)
                .set('prevX', 0)
                .set('prevY', 0)
                .set('cursor', '-webkit-grab')));
    }

    private selectLayer(layer: Layer) {
        d3.event.stopPropagation();

        this.props.onSelect(new SelectedItem({ id: layer.id, type: ItemType.Layer }));
    }

    private deselectAll() {
        this.props.onDeselect();
    }

    private startLayerDragging(layer: Layer) {
        if (isSelected(layer, this.props.selectedItem) && this.props.isEdit) {
            d3.event.stopPropagation();

            this.setState(prevState => prevState.set('dragging',
                prevState.dragging
                    .set('isActive', true)
                    .set('layerId', layer.id)));
        }
    }

    private dragLayer() {
        if (!this.state.dragging.isActive) {
            return;
        }

        const layer = this.props.layers.find(l => l.id === this.state.dragging.layerId);

        if (layer) {
            d3.event.stopPropagation();

            this.setState(prevState => prevState.set('dragging',
                prevState.dragging
                    .set('dx', prevState.dragging.dx + d3.event.movementX / prevState.scale)
                    .set('dy', prevState.dragging.dy + d3.event.movementY / prevState.scale)));
        }
    }

    private dropLayer() {
        if (!this.state.dragging.isActive) {
            return;
        }

        const layer = this.props.layers.find(l => l.id === this.state.dragging.layerId);

        if (layer) {
            d3.event.stopPropagation();

            this.props.onMoveLayer(layer.id, this.state.dragging.dx, this.state.dragging.dy);
            this.setState(prevState => prevState.set('dragging', new DraggingState()));
        }
    }

    public render(): React.ReactNode {
        return (
                <svg id={d3RootId}
                    onWheel={e => this.updateScale(e)}
                    onMouseDown={e => this.startGrabbing(e.clientX, e.clientY)}
                    onMouseMove={e => this.translate(e.clientX, e.clientY)}
                    onMouseUp={e => this.endGrabbing()}
                    onClick={() => this.deselectAll()}
                    style={{ cursor: this.state.grabbing.cursor }}></svg>
        );
    }
}