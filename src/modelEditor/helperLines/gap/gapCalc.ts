export interface Range {
    start: number;
    end: number;
}

// [start]    [end]    [start]    [end]
//  |‾‾‾‾‾‾‾‾‾‾‾|       |‾‾‾‾‾‾‾‾‾‾‾|
//  |     a     |←[gap]→|     b     |
//  |___________|       |___________|
type Gap<T extends Range = Range> = {
    value: number;
    prev: T;
    next: T;
};

const rangeToGap = <T extends Range = Range>(ranges: T[]): Gap<T>[] => {
    const gaps: Gap<T>[] = [];

    const sortedRanges = ranges.filter((it) => it !== undefined).sort((a, b) => a.start - b.start);

    if (sortedRanges.length === 0) return gaps;

    let current = sortedRanges[0]!;
    for (let i = 1; i < sortedRanges.length; i++) {
        const next = sortedRanges[i]!;

        // [start]    [end]    [start]    [end]
        //  |‾‾‾‾‾‾‾‾‾‾‾|       |‾‾‾‾‾‾‾‾‾‾‾|
        //  |  current  |←[gap]→|   next    |
        //  |___________|       |___________|
        const gapValue = next.start - current.end;
        if (gapValue > 0) {
            gaps.push({
                value: gapValue,
                prev: current,
                next: next,
            });
        }
        // 无论是否重叠，将current置为靠后的元素
        current = current.end < next.end ? next : current;
    }

    return gaps;
};

type MatchResult<T extends Range = Range> = {
    gaps: Gap<T>[];
    gap: number;
    diff: number;
};

// |a|←-→|b|←-→|c|←-→|d|
//                 ↑
//         ←--- current
const matchPrev = <T extends Range = Range>(
    gaps: Gap<T>[],
    currentGapIndex: number,
    tolerance: number,
): MatchResult<T> | undefined => {
    const current = gaps[currentGapIndex];
    if (current === undefined) return;

    const result: Gap<T>[] = [current];

    let prev = gaps[currentGapIndex - 1];
    if (prev === undefined) {
        return {
            gaps: [current],
            gap: current.value,
            diff: 0,
        };
    }

    if (Math.abs(current.value - prev.value) <= tolerance) {
        result.push(prev);
    } else {
        return {
            gaps: [current],
            gap: current.value,
            diff: 0,
        };
    }

    for (let i = currentGapIndex - 2; i >= 0; i--) {
        const gap = gaps[i];
        if (!gap) break;
        if (gap.value === prev.value) {
            result.push(gap);
        } else {
            break;
        }
    }

    return {
        gaps: result,
        gap: prev.value,
        // |a| 2 |b| 2 |c| 1 |d|
        // diff = 2-1 = +1
        // (d.x need +1)
        //
        // |a| 2 |b| 2 |c| 3 |d|
        // diff = 2-3 = -1
        // (d.x need -1)
        //
        diff: prev.value - current.value,
    };
};

// |a|←-→|b|←-→|c|←-→|d|
//     ↑
//  current --->
const matchNext = <T extends Range = Range>(
    gaps: Gap<T>[],
    currentGapIndex: number,
    tolerance: number,
): MatchResult<T> | undefined => {
    const current = gaps[currentGapIndex];
    if (current === undefined) return;

    const result: Gap<T>[] = [current];

    let next = gaps[currentGapIndex + 1];
    if (next === undefined) {
        return {
            gaps: [current],
            gap: current.value,
            diff: 0,
        };
    }

    if (Math.abs(current.value - next.value) <= tolerance) {
        result.push(next);
    } else {
        return {
            gaps: [current],
            gap: current.value,
            diff: 0,
        };
    }

    for (let i = currentGapIndex + 2; i < gaps.length; i++) {
        const gap = gaps[i];
        if (!gap) break;
        if (gap.value === next.value) {
            result.push(gap);
        } else {
            break;
        }
    }

    return {
        gaps: result,
        gap: next.value,
        // |a| 1 |b| 2 |c| 2 |d|
        // diff = 1-2 = -1
        // (a.x need -1)
        //
        // |a| 3 |b| 2 |c| 2 |d|
        // diff = 3-2 = +1
        // (a.x need +1)
        //
        diff: current.value - next.value,
    };
};

const matchGaps = <T extends Range = Range>(
    gaps: Gap<T>[],
    prevGapIndex: number,
    nextGapIndex: number,
    tolerance: number,
): MatchResult<T> | undefined => {
    const prevMatched = matchPrev(gaps, prevGapIndex, tolerance);
    const nextMatched = matchNext(gaps, nextGapIndex, tolerance);

    if (prevMatched === undefined) {
        return nextMatched;
    } else if (nextMatched === undefined) {
        return prevMatched;
    } else {
        if (prevMatched.gap === nextMatched.gap) {
            if (prevMatched.diff === nextMatched.diff) {
                return {
                    gaps: [...prevMatched.gaps, ...nextMatched.gaps],
                    gap: prevMatched.gap,
                    diff: prevMatched.diff,
                };
            }
        }
        const firstPrevGap = prevMatched.gaps[0];
        const firstNextGap = nextMatched.gaps[0];
        if (firstPrevGap && firstNextGap) {
            if (Math.abs(firstPrevGap.value - firstNextGap.value) <= tolerance) {
                return {
                    gaps: [firstPrevGap, firstNextGap],
                    gap: (firstPrevGap.value + firstNextGap.value) / 2,
                    diff: (firstNextGap.value - firstPrevGap.value) / 2,
                };
            }
        }
        return prevMatched.gap < nextMatched.gap ? prevMatched : nextMatched;
    }
};

export const rangeMatchGap = <T extends Range = Range>(
    ranges: T[],
    rangeIndex: number,
    tolerance: number,
): MatchResult<T> | undefined => {
    const gaps = rangeToGap(ranges);
    const prevGapIndex = gaps.findIndex((gap) => gap.next === ranges[rangeIndex]);
    const nextGapIndex = gaps.findIndex((gap) => gap.prev === ranges[rangeIndex]);
    if (prevGapIndex === -1 && nextGapIndex === -1) return;
    return matchGaps(gaps, prevGapIndex, nextGapIndex, tolerance);
};
