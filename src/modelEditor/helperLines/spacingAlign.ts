import type {NodeBounds} from './type/NodeBounds.ts';
import type {HorizontalHelperLine, VerticalHelperLine} from './type/HelpLine.ts';
import {rangeMatchGap} from './gap/gapCalc.ts';

type HorizontalSpacingAlign = {
    lines: HorizontalHelperLine[];
    snapX: number;
};

type VerticalSpacingAlign = {
    lines: VerticalHelperLine[];
    snapY: number;
};

const getVerticalIntersectNodes = (nodeA: NodeBounds, nodes: NodeBounds[]): NodeBounds[] =>
    nodes.filter((nodeB) => nodeA.left <= nodeB.right && nodeA.right >= nodeB.left);

const getHorizontalIntersectNodes = (nodeA: NodeBounds, nodes: NodeBounds[]): NodeBounds[] =>
    nodes.filter((nodeB) => nodeA.top <= nodeB.bottom && nodeA.bottom >= nodeB.top);

type NodeRange = {
    start: number;
    end: number;
    node: NodeBounds;
};

// 节点水平间距对齐
export const getHorizontalSpacingAlign = (
    nodeA: NodeBounds,
    _nodes: NodeBounds[],
    tolerance: number,
): HorizontalSpacingAlign | undefined => {
    const nodes = getHorizontalIntersectNodes(nodeA, _nodes);
    if (nodes.length < 2) return undefined;

    const nodeRanges: NodeRange[] = [nodeA, ...nodes].map((node) => ({
        start: node.left,
        end: node.right,
        node,
    }));
    const nodeAIndex = nodeRanges.findIndex(({node}) => node.id === nodeA.id);
    const matchResult = rangeMatchGap(nodeRanges, nodeAIndex, tolerance);
    if (matchResult === undefined || matchResult.gaps.length < 2) return undefined;

    const snapX = nodeA.left + matchResult.diff;
    // 生成辅助线
    const lines: HorizontalHelperLine[] = [];
    for (const gap of matchResult.gaps) {
        if (gap.prev.node.id === nodeA.id) {
            lines.push({
                startX: snapX + nodeA.width,
                endX: gap.next.node.left,
                y:
                    (gap.prev.node.top +
                        gap.prev.node.bottom +
                        gap.next.node.top +
                        gap.next.node.bottom) /
                    4,
            });
            continue;
        } else if (gap.next.node.id === nodeA.id) {
            lines.push({
                startX: gap.prev.node.right,
                endX: snapX,
                y:
                    (gap.prev.node.top +
                        gap.prev.node.bottom +
                        gap.next.node.top +
                        gap.next.node.bottom) /
                    4,
            });
            continue;
        }
        lines.push({
            startX: gap.prev.node.right,
            endX: gap.next.node.left,
            y:
                (gap.prev.node.top +
                    gap.prev.node.bottom +
                    gap.next.node.top +
                    gap.next.node.bottom) /
                4,
        });
    }

    return {
        lines,
        snapX,
    };
};

// 节点垂直间距对齐
export const getVerticalSpacingAlign = (
    nodeA: NodeBounds,
    _nodes: NodeBounds[],
    tolerance: number,
): VerticalSpacingAlign | undefined => {
    const nodes = getVerticalIntersectNodes(nodeA, _nodes);
    if (nodes.length < 2) return undefined;

    const nodeRanges: NodeRange[] = [nodeA, ...nodes].map((node) => ({
        start: node.top,
        end: node.bottom,
        node,
    }));
    const nodeAIndex = nodeRanges.findIndex(({node}) => node.id === nodeA.id);
    const matchResult = rangeMatchGap(nodeRanges, nodeAIndex, tolerance);
    if (matchResult === undefined || matchResult.gaps.length < 2) return undefined;

    const snapY = nodeA.top + matchResult.diff;
    // 生成辅助线
    const lines: VerticalHelperLine[] = [];
    for (const gap of matchResult.gaps) {
        if (gap.prev.node.id === nodeA.id) {
            lines.push({
                startY: snapY + nodeA.height,
                endY: gap.next.node.top,
                x:
                    (gap.prev.node.left +
                        gap.prev.node.right +
                        gap.next.node.left +
                        gap.next.node.right) /
                    4,
            });
            continue;
        } else if (gap.next.node.id === nodeA.id) {
            lines.push({
                startY: gap.prev.node.bottom,
                endY: snapY,
                x:
                    (gap.prev.node.left +
                        gap.prev.node.right +
                        gap.next.node.left +
                        gap.next.node.right) /
                    4,
            });
            continue;
        }
        lines.push({
            startY: gap.prev.node.bottom,
            endY: gap.next.node.top,
            x:
                (gap.prev.node.left +
                    gap.prev.node.right +
                    gap.next.node.left +
                    gap.next.node.right) /
                4,
        });
    }

    return {
        lines,
        snapY,
    };
};
