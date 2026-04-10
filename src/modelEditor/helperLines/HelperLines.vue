<script setup lang="ts">
import {computed, useTemplateRef, watch} from 'vue';
import {type NodeChange, type NodePositionChange, useVueFlow} from '@vue-flow/core';
import {
    getSnapLines,
    type HorizontalType,
    type SnapLine,
    type SnapLineResult,
    type VerticalType,
} from './snapLines.ts';
import {useThemeStore} from '@/store/themeStore.ts';
import type {NodeBounds} from './type/NodeBounds.ts';
import type {HorizontalHelperLine, VerticalHelperLine} from './type/HelpLine.ts';
import {getHorizontalSpacingAlign, getVerticalSpacingAlign} from './spacingAlign.ts';
import {throttle} from 'lodash-es';
import {VUE_FLOW_ID} from '@/modelEditor/useModelEditor.ts';

const props = withDefaults(
    defineProps<{
        spinDistance?: number | undefined;
        spinLineWidth?: number | undefined;
        spinLineExtension?: number | undefined;
        spinLineDashed?: number | undefined;

        spacingAlignTolerance?: number | undefined;
        spacingAlignLineWidth?: number | undefined;
        spacingAlignExtension?: number | undefined;
        spacingAlignOffset?: number | undefined;
    }>(),
    {
        spinDistance: 5,
        spinLineWidth: 1,
        spinLineExtension: 24,
        spinLineDashed: 2,

        spacingAlignTolerance: 5,
        spacingAlignLineWidth: 1,
        spacingAlignExtension: 8,
        spacingAlignOffset: 2,
    },
);

const vueFlow = useVueFlow(VUE_FLOW_ID);

const themeStore = useThemeStore();

const canvasRef = useTemplateRef<HTMLCanvasElement>('canvasRef');

let hSnapLines: HorizontalHelperLine[] | undefined;
let vSnapLines: VerticalHelperLine[] | undefined;

let hSpacingLines: HorizontalHelperLine[] | undefined;
let vSpacingLines: VerticalHelperLine[] | undefined;

const width = computed(() => vueFlow.dimensions.value.width);
const height = computed(() => vueFlow.dimensions.value.height);

const x = computed(() => vueFlow.viewport.value.x);
const y = computed(() => vueFlow.viewport.value.y);
const zoom = computed(() => vueFlow.viewport.value.zoom);

const xGraphToCanvas = (value: number): number => value * zoom.value + x.value;
const yGraphToCanvas = (value: number): number => value * zoom.value + y.value;

// 视口边界（考虑 zoom 和平移）
const viewportRect = computed(() => {
    return {
        left: -x.value / zoom.value,
        right: (-x.value + width.value) / zoom.value,
        top: -y.value / zoom.value,
        bottom: (-y.value + height.value) / zoom.value,
    };
});

const getInViewportNodeBounds = () => {
    const {
        left: viewportLeft,
        right: viewportRight,
        top: viewportTop,
        bottom: viewportBottom,
    } = viewportRect.value;

    return vueFlow.nodes.value
        .map((node) => ({
            id: node.id,
            left: node.position.x,
            right: node.position.x + node.dimensions.width,
            top: node.position.y,
            bottom: node.position.y + node.dimensions.height,
            width: node.dimensions.width,
            height: node.dimensions.height,
        }))
        .filter((bounds) => {
            // 检查是否在可见区域内（有重叠）
            return (
                bounds.right > viewportLeft &&
                bounds.left < viewportRight &&
                bounds.bottom > viewportTop &&
                bounds.top < viewportBottom
            );
        });
};

const setHSnapLines = (snapLineMap: Map<HorizontalType, SnapLine>, nodeABounds: NodeBounds) => {
    const lines: SnapLine[] = [];
    if (snapLineMap.has('top-top') && snapLineMap.has('bottom-bottom')) {
        lines.push(snapLineMap.get('top-top')!, snapLineMap.get('bottom-bottom')!);
    } else if (snapLineMap.has('centerY')) {
        lines.push(snapLineMap.get('centerY')!);
    } else {
        lines.push(...snapLineMap.values());
    }
    hSnapLines = lines.map(({value, targets}) => {
        const minX = Math.min(nodeABounds.left, ...targets.map((it) => it.left));
        const maxX = Math.max(nodeABounds.right, ...targets.map((it) => it.right));
        return {
            startX: xGraphToCanvas(minX) - props.spinLineExtension,
            endX: xGraphToCanvas(maxX) + props.spinLineExtension,
            y: yGraphToCanvas(value),
        };
    });
};

const setVSnapLines = (snapLineMap: Map<VerticalType, SnapLine>, nodeABounds: NodeBounds) => {
    const lines: SnapLine[] = [];
    if (snapLineMap.has('left-left') && snapLineMap.has('right-right')) {
        lines.push(snapLineMap.get('left-left')!, snapLineMap.get('right-right')!);
    } else if (snapLineMap.has('centerX')) {
        lines.push(snapLineMap.get('centerX')!);
    } else {
        lines.push(...snapLineMap.values());
    }
    vSnapLines = lines.map(({value, targets}) => {
        const minY = Math.min(nodeABounds.top, ...targets.map((it) => it.top));
        const maxY = Math.max(nodeABounds.bottom, ...targets.map((it) => it.bottom));
        return {
            x: xGraphToCanvas(value),
            startY: yGraphToCanvas(minY) - props.spinLineExtension,
            endY: yGraphToCanvas(maxY) + props.spinLineExtension,
        };
    });
};

const setHSpacingLines = (lines: HorizontalHelperLine[]) => {
    if (lines.length === 0) {
        hSpacingLines = undefined;
        return;
    }
    hSpacingLines = lines.map((line) => ({
        startX: xGraphToCanvas(line.startX),
        endX: xGraphToCanvas(line.endX),
        y: yGraphToCanvas(line.y),
    }));
};

const setVSpacingLines = (lines: VerticalHelperLine[]) => {
    if (lines.length === 0) {
        vSpacingLines = undefined;
        return;
    }
    vSpacingLines = lines.map((line) => ({
        x: xGraphToCanvas(line.x),
        startY: yGraphToCanvas(line.startY),
        endY: yGraphToCanvas(line.endY),
    }));
};

const handleNodePositionChange = (change: NodePositionChange) => {
    if (!('position' in change) || !change.position) return;

    const nodeA = vueFlow.nodes.value.find((node) => node.id === change.id);
    if (!nodeA) return;

    const nodeABounds: NodeBounds = {
        id: nodeA.id,
        left: change.position.x,
        right: change.position.x + nodeA.dimensions.width,
        top: change.position.y,
        bottom: change.position.y + nodeA.dimensions.height,
        width: nodeA.dimensions.width,
        height: nodeA.dimensions.height,
    };
    const nodeBounds = getInViewportNodeBounds().filter((bound) => bound.id !== nodeABounds.id);

    // 吸附线
    const snapLines = getSnapLines(nodeABounds, nodeBounds, props.spinDistance);

    if (snapLines.snapX !== undefined) {
        change.position.x = snapLines.snapX;
    }
    if (snapLines.snapY !== undefined) {
        change.position.y = snapLines.snapY;
    }

    setHSnapLines(snapLines.horizontalMap, nodeABounds);
    setVSnapLines(snapLines.verticalMap, nodeABounds);

    // 水平间距对齐线
    const hSpacingGroup = getHorizontalSpacingAlign(
        nodeABounds,
        nodeBounds,
        props.spacingAlignTolerance,
    );
    if (hSpacingGroup) {
        setHSpacingLines(hSpacingGroup.lines);
        if (hSpacingGroup.snapX !== change.position.x) {
            change.position.x = hSpacingGroup.snapX;
            vSnapLines = undefined;
        }
    } else {
        hSpacingLines = undefined;
    }

    // 垂直间距对齐线
    const vSpacingGroup = getVerticalSpacingAlign(
        nodeABounds,
        nodeBounds,
        props.spacingAlignTolerance,
    );
    if (vSpacingGroup) {
        setVSpacingLines(vSpacingGroup.lines);
        if (vSpacingGroup.snapY !== change.position.y) {
            change.position.y = vSpacingGroup.snapY;
            hSnapLines = undefined;
        }
    } else {
        vSpacingLines = undefined;
    }

    vueFlow.applyNodeChanges([change]);

    drawHelperLines();
};

const handleNodeBatchPositionChange = (changes: NodePositionChange[]) => {
    if (changes.length === 0 || !changes[0]) return;

    // 收集所有被拖拽节点的边界信息
    const changedNodesBounds: NodeBounds[] = [];
    const changedIdSet = new Set<string>();

    for (const change of changes) {
        if (!('position' in change) || !change.position) continue;

        const node = vueFlow.nodes.value.find((n) => n.id === change.id);
        if (!node) continue;

        changedIdSet.add(node.id);
        changedNodesBounds.push({
            id: node.id,
            left: change.position.x,
            right: change.position.x + node.dimensions.width,
            top: change.position.y,
            bottom: change.position.y + node.dimensions.height,
            width: node.dimensions.width,
            height: node.dimensions.height,
        });
    }

    if (changedNodesBounds.length === 0) return;

    // 获取其他未移动的节点边界
    const nodesBounds = getInViewportNodeBounds().filter((bound) => !changedIdSet.has(bound.id));

    const snapLinesPair: [NodeBounds, SnapLineResult][] = changedNodesBounds.map((nodeABounds) => {
        return [nodeABounds, getSnapLines(nodeABounds, nodesBounds, props.spinDistance)];
    });

    // 寻找最小的snapX和snapY对应的snapLines
    let minSnapX: number | undefined;
    let minSnapY: number | undefined;
    let bestSnapXResult: SnapLineResult | undefined;
    let bestSnapYResult: SnapLineResult | undefined;
    let bestSnapXBounds: NodeBounds | undefined;
    let bestSnapYBounds: NodeBounds | undefined;

    for (const pair of snapLinesPair) {
        const [nodeBounds, snapLines] = pair;
        if (snapLines.snapX !== undefined) {
            if (minSnapX === undefined || snapLines.snapX < minSnapX) {
                minSnapX = snapLines.snapX;
                bestSnapXResult = snapLines;
                bestSnapXBounds = nodeBounds;
            }
        }
        if (snapLines.snapY !== undefined) {
            if (minSnapY === undefined || snapLines.snapY < minSnapY) {
                minSnapY = snapLines.snapY;
                bestSnapYResult = snapLines;
                bestSnapYBounds = nodeBounds;
            }
        }
    }

    // 计算整体边界的偏移量
    const offsetX = minSnapX !== undefined && bestSnapXBounds ? minSnapX - bestSnapXBounds.left : 0;
    const offsetY = minSnapY !== undefined && bestSnapYBounds ? minSnapY - bestSnapYBounds.top : 0;

    // 将偏移应用到所有被拖拽的节点
    for (let i = 0; i < changes.length; i++) {
        const change = changes[i];
        if (!change || !('position' in change) || !change.position) continue;

        if (offsetX !== 0) {
            change.position.x += offsetX;
        }
        if (offsetY !== 0) {
            change.position.y += offsetY;
        }
    }

    // 使用最佳匹配的snapLines进行显示
    if (bestSnapXResult && bestSnapXBounds) {
        setVSnapLines(bestSnapXResult.verticalMap, bestSnapXBounds);
    }
    if (bestSnapYResult && bestSnapYBounds) {
        setHSnapLines(bestSnapYResult.horizontalMap, bestSnapYBounds);
    }
    hSpacingLines = undefined;
    vSpacingLines = undefined;

    vueFlow.applyNodeChanges(changes);

    drawHelperLines();
};

const produceNodeChange = (changes: NodeChange[]) => {
    if (changes.length > 1) {
        const positionChanges = changes.filter((change) => change.type === 'position');
        if (positionChanges.length === changes.length) {
            handleNodeBatchPositionChange(positionChanges);
            return;
        }
    } else if (changes.length === 1 && changes[0]) {
        const change = changes[0];
        if (change.type === 'position') {
            handleNodePositionChange(change);
            return;
        }
    }
};
vueFlow.onNodesChange(produceNodeChange);

const drawHelperLines = () => {
    const canvas = canvasRef.value;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas) {
        return;
    }

    const dpi = window.devicePixelRatio;
    canvas.width = width.value * dpi;
    canvas.height = height.value * dpi;

    ctx.scale(dpi, dpi);
    ctx.clearRect(0, 0, width.value, height.value);

    // 绘制吸附辅助线
    ctx.beginPath();
    ctx.strokeStyle = themeStore.primaryColor.value;
    ctx.lineWidth = props.spinLineWidth;
    ctx.setLineDash([props.spinLineDashed, props.spinLineDashed]);
    if (vSnapLines !== undefined) {
        for (const line of vSnapLines) {
            ctx.moveTo(line.x, line.startY);
            ctx.lineTo(line.x, line.endY);
        }
    }
    if (hSnapLines !== undefined) {
        for (const line of hSnapLines) {
            ctx.moveTo(line.startX, line.y);
            ctx.lineTo(line.endX, line.y);
        }
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // 绘制间距辅助线
    ctx.beginPath();
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = props.spacingAlignLineWidth;
    if (hSpacingLines !== undefined) {
        for (const line of hSpacingLines) {
            const startY = line.y + props.spacingAlignOffset;
            const centerY = startY + props.spacingAlignExtension;
            const endY = centerY + props.spacingAlignExtension;

            const startX = line.startX + props.spacingAlignLineWidth;
            const endX = line.endX - props.spacingAlignLineWidth;

            ctx.moveTo(startX, centerY);
            ctx.lineTo(endX, centerY);

            ctx.moveTo(startX, startY);
            ctx.lineTo(startX, endY);

            ctx.moveTo(endX, startY);
            ctx.lineTo(endX, endY);
        }
    }
    if (vSpacingLines !== undefined) {
        for (const line of vSpacingLines) {
            const startX = line.x + props.spacingAlignOffset;
            const centerX = startX + props.spacingAlignExtension;
            const endX = centerX + props.spacingAlignExtension;

            const startY = line.startY + props.spacingAlignLineWidth;
            const endY = line.endY - props.spacingAlignLineWidth;

            ctx.moveTo(centerX, startY);
            ctx.lineTo(centerX, endY);

            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, startY);

            ctx.moveTo(startX, endY);
            ctx.lineTo(endX, endY);
        }
    }
    ctx.stroke();
};

const cleanHelperLines = throttle(() => {
    hSnapLines = undefined;
    vSnapLines = undefined;
    hSpacingLines = undefined;
    vSpacingLines = undefined;

    const canvas = canvasRef.value;
    const ctx = canvas?.getContext('2d');

    if (!ctx || !canvas) {
        return;
    }

    const dpi = window.devicePixelRatio;
    canvas.width = width.value * dpi;
    canvas.height = height.value * dpi;

    ctx.scale(dpi, dpi);
    ctx.clearRect(0, 0, width.value, height.value);
}, 100);

watch(
    () => [
        width.value,
        height.value,
        x.value,
        y.value,
        zoom.value,
        vueFlow.getSelectedNodes.value.length,
        vueFlow.getSelectedEdges.value.length,
    ],
    () => cleanHelperLines(),
    {immediate: true},
);
</script>

<template>
    <canvas
        ref="canvasRef"
        class="vue-flow__canvas"
    />
</template>

<style scoped>
.vue-flow__canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    pointer-events: none;
}
</style>
