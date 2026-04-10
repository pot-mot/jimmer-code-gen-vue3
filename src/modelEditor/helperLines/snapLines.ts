import type {NodeBounds} from './type/NodeBounds.ts';

export type HorizontalType = 'centerY' | 'top-top' | 'bottom-bottom' | 'top-bottom' | 'bottom-top';
export type VerticalType = 'centerX' | 'left-left' | 'right-right' | 'left-right' | 'right-left';

export type SnapLine = {
    value: number;
    targets: [NodeBounds, ...NodeBounds[]];
};

export type SnapLineResult = {
    horizontalMap: Map<HorizontalType, SnapLine>;
    verticalMap: Map<VerticalType, SnapLine>;
    snapX: number | undefined;
    snapY: number | undefined;
};

type VerticalCheck = {
    type: VerticalType;
    check: (nodeB: NodeBounds) => {
        distance: number;
        value: number;
        snapX: number;
    };
};

type HorizontalCheck = {
    type: HorizontalType;
    check: (nodeB: NodeBounds) => {
        distance: number;
        value: number;
        snapY: number;
    };
};

export const getSnapLines = (
    nodeA: NodeBounds,
    nodes: NodeBounds[],
    distance: number,
    ignoreVType: VerticalType[] = [],
    ignoreHType: HorizontalType[] = [],
): SnapLineResult => {
    const result: SnapLineResult = {
        horizontalMap: new Map(),
        verticalMap: new Map(),
        snapX: undefined,
        snapY: undefined,
    };

    let horizontalDistance = distance;
    let verticalDistance = distance;

    const centerX_A = nodeA.left + nodeA.width / 2;
    const centerY_A = nodeA.top + nodeA.height / 2;

    // 定义所有需要检测的类型及其处理函数
    const verticalChecks: VerticalCheck[] = [
        //    |‾‾‾‾‾‾‾‾‾‾‾|
        //    |     A     |
        //    |___________|
        //          |
        //          |
        //    |‾‾‾‾‾‾‾‾‾‾‾|
        //    |     B     |
        //    |___________|
        {
            type: 'centerX',
            check: (nodeB: NodeBounds) => {
                const centerX_B = nodeB.left + nodeB.width / 2;
                return {
                    distance: Math.abs(centerX_A - centerX_B),
                    value: centerX_B,
                    snapX: nodeB.left + (nodeB.width - nodeA.width) / 2,
                };
            },
        },
        //  |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     A     |
        //  |___________|
        //  |
        //  |
        //  |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     B     |
        //  |___________|
        {
            type: 'left-left',
            check: (nodeB: NodeBounds) => ({
                distance: Math.abs(nodeA.left - nodeB.left),
                value: nodeB.left,
                snapX: nodeB.left,
            }),
        },
        //  |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     A     |
        //  |___________|
        //              |
        //              |
        //  |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     B     |
        //  |___________|
        {
            type: 'right-right',
            check: (nodeB: NodeBounds) => ({
                distance: Math.abs(nodeA.right - nodeB.right),
                value: nodeB.right,
                snapX: nodeB.right - nodeA.width,
            }),
        },
        //              |‾‾‾‾‾‾‾‾‾‾‾|
        //              |     A     |
        //              |___________|
        //              |
        //              |
        //  |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     B     |
        //  |___________|
        {
            type: 'left-right',
            check: (nodeB: NodeBounds) => ({
                distance: Math.abs(nodeA.left - nodeB.right),
                value: nodeB.right,
                snapX: nodeB.right,
            }),
        },
        //  |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     A     |
        //  |___________|
        //              |
        //              |
        //              |‾‾‾‾‾‾‾‾‾‾‾|
        //              |     B     |
        //              |___________|
        {
            type: 'right-left',
            check: (nodeB: NodeBounds) => ({
                distance: Math.abs(nodeA.right - nodeB.left),
                value: nodeB.left,
                snapX: nodeB.left - nodeA.width,
            }),
        },
    ];

    const horizontalChecks: HorizontalCheck[] = [
        //  |‾‾‾‾‾‾‾‾‾‾‾|     |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     A     |-----|     B     |
        //  |___________|     |___________|
        {
            type: 'centerY',
            check: (nodeB: NodeBounds) => {
                const centerY_B = nodeB.top + nodeB.height / 2;
                return {
                    distance: Math.abs(centerY_A - centerY_B),
                    value: centerY_B,
                    snapY: nodeB.top + (nodeB.height - nodeA.height) / 2,
                };
            },
        },
        //  |‾‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾‾|
        //  |     A     |     |     B     |
        //  |___________|     |___________|
        {
            type: 'top-top',
            check: (nodeB: NodeBounds) => ({
                distance: Math.abs(nodeA.top - nodeB.top),
                value: nodeB.top,
                snapY: nodeB.top,
            }),
        },
        //  |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     A     |
        //  |___________|_________________
        //                    |           |
        //                    |     B     |
        //                    |___________|
        {
            type: 'bottom-top',
            check: (nodeB: NodeBounds) => ({
                distance: Math.abs(nodeA.bottom - nodeB.top),
                value: nodeB.top,
                snapY: nodeB.top - nodeA.height,
            }),
        },
        //  |‾‾‾‾‾‾‾‾‾‾‾|     |‾‾‾‾‾‾‾‾‾‾‾|
        //  |     A     |     |     B     |
        //  |___________|_____|___________|
        {
            type: 'bottom-bottom',
            check: (nodeB: NodeBounds) => ({
                distance: Math.abs(nodeA.bottom - nodeB.bottom),
                value: nodeB.bottom,
                snapY: nodeB.bottom - nodeA.height,
            }),
        },
        //                    |‾‾‾‾‾‾‾‾‾‾‾|
        //                    |     B     |
        //                    |           |
        //  |‾‾‾‾‾‾‾‾‾‾‾|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
        //  |     A     |
        //  |___________|
        {
            type: 'top-bottom',
            check: (nodeB: NodeBounds) => ({
                distance: Math.abs(nodeA.top - nodeB.bottom),
                value: nodeB.bottom,
                snapY: nodeB.bottom,
            }),
        },
    ];

    // 处理垂直方向的对齐线
    for (const {type, check} of verticalChecks) {
        if (ignoreVType.includes(type)) continue;

        for (const nodeB of nodes) {
            const {distance: currentDistance, value, snapX} = check(nodeB);

            if (currentDistance < verticalDistance) {
                result.snapX = snapX;
                result.verticalMap.clear();
                result.verticalMap.set(type, {targets: [nodeB], value});
                verticalDistance = currentDistance;
            } else if (currentDistance === verticalDistance && result.snapX === snapX) {
                const vertical = result.verticalMap.get(type);
                if (!vertical) {
                    result.verticalMap.set(type, {targets: [nodeB], value});
                } else {
                    vertical.targets.push(nodeB);
                }
            }
        }
    }

    // 处理水平方向的对齐线
    for (const {type, check} of horizontalChecks) {
        if (ignoreHType.includes(type)) continue;

        for (const nodeB of nodes) {
            const {distance: currentDistance, value, snapY} = check(nodeB);

            if (currentDistance < horizontalDistance) {
                result.snapY = snapY;
                result.horizontalMap.clear();
                result.horizontalMap.set(type, {targets: [nodeB], value});
                horizontalDistance = currentDistance;
            } else if (currentDistance === horizontalDistance && result.snapY === snapY) {
                const horizontal = result.horizontalMap.get(type);
                if (!horizontal) {
                    result.horizontalMap.set(type, {targets: [nodeB], value});
                } else {
                    horizontal.targets.push(nodeB);
                }
            }
        }
    }

    return result;
};
