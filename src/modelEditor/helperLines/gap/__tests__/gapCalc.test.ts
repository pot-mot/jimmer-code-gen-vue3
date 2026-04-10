import {describe, it, expect, assert} from 'vitest';
import {rangeMatchGap, type Range} from '../gapCalc';

interface TestRange extends Range {
    id: string;
}

describe('rangeMatchGap', () => {
    describe('基础功能测试', () => {
        it('处理空数组', () => {
            const ranges: TestRange[] = [];
            const result = rangeMatchGap(ranges, 0, 0);
            expect(result).toBeUndefined();
        });

        it('处理只有一个元素的数组', () => {
            const ranges: TestRange[] = [{start: 0, end: 10, id: 'a'}];
            const result = rangeMatchGap(ranges, 0, 0);
            expect(result).toBeUndefined();
        });

        it('处理只有两个元素的数组', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 10, id: 'a'},
                // 10
                {start: 20, end: 30, id: 'b'},
            ];
            const result = rangeMatchGap(ranges, 1, 0);
            assert(result);
            expect(result.gaps.length).toBe(1);
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(0);
        });
    });

    describe('向前匹配测试 (matchPrev)', () => {
        it('正确向前匹配相同间距，仅1个', () => {
            const ranges: TestRange[] = [
                {start: 20, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
                // 5
                {start: 55, end: 65, id: 'd'},
            ];

            const result = rangeMatchGap(ranges, 2, 5);
            assert(result);
            expect(result.gaps.length).toBe(2);
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(5);
        });

        it('正确向前匹配相同间距，2个相同', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 10, id: 'a'},
                // 10
                {start: 20, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
                // 5
                {start: 55, end: 65, id: 'd'},
            ];

            const result = rangeMatchGap(ranges, 3, 5);
            assert(result);
            expect(result.gaps.length).toBe(3);
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(5);
        });

        it('正确向前匹配相同间距，无容差', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 10, id: 'a'},
                // 10
                {start: 20, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
                // 5
                {start: 55, end: 65, id: 'd'},
            ];

            const result = rangeMatchGap(ranges, 3, 0);
            assert(result);
            expect(result.gaps.length).toBe(1);
            expect(result.gap).toBe(5);
            expect(result.diff).toBe(0);
        });

        it('正确向前匹配相同间距，2个，仅1个相同', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 15, id: 'a'},
                // 5
                {start: 20, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
                // 5
                {start: 55, end: 65, id: 'd'},
            ];

            const result = rangeMatchGap(ranges, 3, 5);
            assert(result);
            expect(result.gaps.length).toBe(2);
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(5);
        });
    });

    describe('向后匹配测试 (matchNext)', () => {
        it('正确向后匹配相同间距,仅1个', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 15, id: 'a'},
                // 5
                {start: 20, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
            ];

            const result = rangeMatchGap(ranges, 0, 5);
            assert(result);
            expect(result.gaps.length).toBe(2);
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(-5);
        });

        it('正确向后匹配相同间距,2个相同', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 15, id: 'a'},
                // 5
                {start: 20, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
                // 10
                {start: 60, end: 70, id: 'd'},
            ];

            const result = rangeMatchGap(ranges, 0, 5);
            assert(result);
            expect(result.gaps.length).toBe(3);
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(-5);
        });

        it('正确向后匹配相同间距,无容差', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 10, id: 'a'},
                // 10
                {start: 20, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
                // 5
                {start: 55, end: 65, id: 'd'},
            ];

            const result = rangeMatchGap(ranges, 0, 0);
            assert(result);
            expect(result.gaps.length).toBe(2);
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(0);
        });

        it('正确向后匹配相同间距,2个,仅1个相同', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 15, id: 'a'},
                // 5
                {start: 20, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
                // 5
                {start: 55, end: 65, id: 'd'},
            ];

            const result = rangeMatchGap(ranges, 0, 5);
            assert(result);
            expect(result.gaps.length).toBe(2);
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(-5);
        });
    });

    describe('双向匹配测试', () => {
        it('在前向和后向匹配相同时间合并结果', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 10, id: 'a'},
                // 10
                {start: 20, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
                // 10
                {start: 60, end: 70, id: 'd'},
                // 10
                {start: 80, end: 90, id: 'e'},
            ];

            const result = rangeMatchGap(ranges, 2, 0);
            assert(result);
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(0);
            expect(result.gaps.length).toBe(4);
        });

        it('在前向和后向都有匹配时选择中心匹配', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 10, id: 'a'},
                // 10
                {start: 20, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
                // 12
                {start: 62, end: 72, id: 'd'},
                // 10
                {start: 82, end: 92, id: 'e'},
            ];

            const result = rangeMatchGap(ranges, 2, 5);
            assert(result);
            expect(result.gaps.length).toBe(2);
            expect(result.gap).toBe(11);
            expect(result.diff).toBe(1);
        });

        it('三项中心对齐', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 12, id: 'b'},
                // 8
                {start: 20, end: 30, id: 'c'},
                // 12
                {start: 42, end: 50, id: 'd'},
            ];

            const result = rangeMatchGap(ranges, 1, 5);
            assert(result);
            expect(result.gaps.length).toBe(2);
            assert(result.gaps[0]);
            expect(result.gaps[0].prev.id).toBe('b');
            expect(result.gaps[0].next.id).toBe('c');
            assert(result.gaps[1]);
            expect(result.gaps[1].prev.id).toBe('c');
            expect(result.gaps[1].next.id).toBe('d');
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(2);
        });

        it('gap相同的多项中心对齐', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 0, id: 'a'},
                // 10
                {start: 10, end: 12, id: 'b'},
                // 8
                {start: 20, end: 30, id: 'c'},
                // 12
                {start: 42, end: 50, id: 'd'},
                // 10
                {start: 60, end: 10, id: 'e'},
            ];

            const result = rangeMatchGap(ranges, 2, 5);
            assert(result);
            expect(result.gaps.length).toBe(4);
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(2);
        });

        it('gap不同的多项中心对齐', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 2, id: 'a'},
                // 8
                {start: 10, end: 12, id: 'b'},
                // 8
                {start: 20, end: 30, id: 'c'},
                // 12
                {start: 42, end: 50, id: 'd'},
                // 12
                {start: 62, end: 10, id: 'e'},
            ];

            const result = rangeMatchGap(ranges, 2, 5);
            assert(result);
            expect(result.gaps.length).toBe(2);
            assert(result.gaps[0]);
            expect(result.gaps[0].prev.id).toBe('b');
            expect(result.gaps[0].next.id).toBe('c');
            assert(result.gaps[1]);
            expect(result.gaps[1].prev.id).toBe('c');
            expect(result.gaps[1].next.id).toBe('d');
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(2);
        });
    });

    describe('边界情况测试', () => {
        it('忽略重叠的范围', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 20, id: 'a'},
                // -10
                {start: 10, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
            ];

            const result = rangeMatchGap(ranges, 2, 0);
            assert(result);
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(0);
        });

        it('忽略重叠的范围有匹配', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 20, id: 'a'},
                // -10
                {start: 10, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
                // 10
                {start: 60, end: 70, id: 'd'},
            ];

            const result = rangeMatchGap(ranges, 3, 0);
            assert(result);
            expect(result.gap).toBe(10);
            expect(result.diff).toBe(0);
            expect(result.gaps.length).toBe(2);
        });

        it('处理相邻的范围（间距为0）', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 10, id: 'a'},
                {start: 10, end: 20, id: 'b'},
                {start: 20, end: 30, id: 'c'},
            ];

            const result = rangeMatchGap(ranges, 2, 0);
            expect(result).toBeUndefined();
        });

        it('处理负数坐标', () => {
            const ranges: TestRange[] = [
                {start: -30, end: -20, id: 'a'},
                {start: -10, end: 0, id: 'b'},
                {start: 10, end: 20, id: 'c'},
            ];

            const result = rangeMatchGap(ranges, 2, 0);
            assert(result);
            expect(result.gap).toBe(10);
        });
    });

    describe('复杂场景测试', () => {
        it('处理多个不同间距组', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 10, id: 'a'},
                // 10
                {start: 20, end: 30, id: 'b'},
                // 10
                {start: 40, end: 50, id: 'c'},
                // 20
                {start: 70, end: 80, id: 'd'},
                // 20
                {start: 100, end: 110, id: 'e'},
            ];

            const resultFor2 = rangeMatchGap(ranges, 2, 0);
            assert(resultFor2);
            expect(resultFor2.gap).toBe(10);
            expect(resultFor2.diff).toBe(0);
            expect(resultFor2.gaps.length).toBe(2);

            const resultFor3 = rangeMatchGap(ranges, 3, 0);
            assert(resultFor3);
            expect(resultFor3.gap).toBe(20);
            expect(resultFor3.diff).toBe(0);
            expect(resultFor3.gaps.length).toBe(2);
        });

        it('处理大范围和小范围混合', () => {
            const ranges: TestRange[] = [
                {start: 0, end: 100, id: 'a'},
                {start: 110, end: 120, id: 'b'},
                {start: 130, end: 140, id: 'c'},
            ];

            const result = rangeMatchGap(ranges, 2, 0);
            assert(result);
            expect(result.gap).toBe(10);
        });
    });

    describe('泛型类型测试', () => {
        it('支持自定义 Range 类型', () => {
            interface CustomRange extends Range {
                nodeId: string;
                metadata: Record<string, any>;
            }

            const ranges: CustomRange[] = [
                {start: 0, end: 10, nodeId: 'node1', metadata: {level: 1}},
                // 10
                {start: 20, end: 30, nodeId: 'node2', metadata: {level: 2}},
                // 10
                {start: 40, end: 50, nodeId: 'node3', metadata: {level: 3}},
            ];

            const result = rangeMatchGap(ranges, 2, 0);
            assert(result);
            expect(result.gaps.length).toBe(2);
            expect(result.gap).toBe(10);
            assert(result.gaps[0]);
            expect(result.gaps[0].prev.nodeId).toBe('node2');
            expect(result.gaps[0].prev.metadata.level).toBe(2);
            expect(result.gaps[0].next.nodeId).toBe('node3');
            assert(result.gaps[1]);
            expect(result.gaps[1].prev.nodeId).toBe('node1');
            expect(result.gaps[1].prev.metadata.level).toBe(1);
            expect(result.gaps[1].next.nodeId).toBe('node2');
        });
    });
});
