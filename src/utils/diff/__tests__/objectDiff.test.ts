import {describe, it, expect, assert} from 'vitest';
import {objectDiff} from '../objectDiff';

describe('objectDiff', () => {
    it('empty object', () => {
        const emptyObjectDiff: ObjectDiff<any> = {type: "object"}
        expect(objectDiff({}, {})).toStrictEqual(emptyObjectDiff);
        expect(objectDiff(null, null)).toStrictEqual(emptyObjectDiff);
        expect(objectDiff(undefined, undefined)).toStrictEqual(emptyObjectDiff);
        expect(objectDiff({}, null)).toStrictEqual(emptyObjectDiff);
        expect(objectDiff(null, {})).toStrictEqual(emptyObjectDiff);
        expect(objectDiff({}, undefined)).toStrictEqual(emptyObjectDiff);
        expect(objectDiff(undefined, {})).toStrictEqual(emptyObjectDiff);
    });

    it('empty added', () => {
        const result = objectDiff(null, {a: 1, b: 2});
        expect(result).toStrictEqual({
            type: "object",
            added: {
                a: {propertyName: 'a', value: 1},
                b: {propertyName: 'b', value: 2}
            }
        });
    });

    it('empty deleted', () => {
        const result = objectDiff({a: 1, b: 2}, null);
        expect(result).toStrictEqual({
            type: "object",
            deleted: {
                a: {propertyName: 'a', value: 1},
                b: {propertyName: 'b', value: 2}
            }
        });
    });

    it('added', () => {
        const result = objectDiff({a: 1}, {a: 1, b: 2});
        expect(result).toStrictEqual({
            type: "object",
            added: {
                b: {propertyName: 'b', value: 2}
            }
        });
    });

    it('deleted', () => {
        const result = objectDiff({a: 1, b: 2}, {a: 1});
        expect(result).toStrictEqual({
            type: "object",
            deleted: {
                b: {propertyName: 'b', value: 2}
            }
        });
    });

    it('updated', () => {
        const result = objectDiff({a: 1, b: 2}, {a: 1, b: 3});
        expect(result).toStrictEqual({
            type: "object",
            updated: {
                b: {
                    propertyName: 'b',
                    prevValue: 2,
                    nextValue: 3,
                    diff: undefined,
                }
            }
        });
    });

    it('multi', () => {
        const result = objectDiff(
            {a: 1, b: 2, c: 5},
            {a: 1, b: 3, d: 4}
        );
        expect(result).toStrictEqual({
            type: "object",
            deleted: {
                c: {propertyName: 'c', value: 5}
            },
            added: {
                d: {propertyName: 'd', value: 4}
            },
            updated: {
                b: {
                    propertyName: 'b',
                    prevValue: 2,
                    nextValue: 3,
                    diff: undefined,
                }
            }
        });
    });

    it('nested', () => {
        const oldObj = {a: {b: 1}};
        const newObj = {a: {b: 2}};
        const result = objectDiff(oldObj, newObj);

        expect(result).toStrictEqual({
            type: "object",
            updated: {
                a: {
                    propertyName: 'a',
                    prevValue: {b: 1},
                    nextValue: {b: 2},
                    diff: {
                        type: "object",
                        updated: {
                            b: {
                                propertyName: 'b',
                                prevValue: 1,
                                nextValue: 2,
                                diff: undefined,
                            }
                        }
                    }
                }
            }
        });
    });

    it('nested array', () => {
        const oldObj = {items: [1, 2, 3]};
        const newObj = {items: [1, 2, 4]};
        const result = objectDiff(oldObj, newObj);

        assert(result.type === "object");
        expect(result.updated).toBeDefined();
        expect(result.updated?.items).toBeDefined();
        expect(result.updated?.items?.diff).toStrictEqual({
            type: "array",
            equals: [
                {
                    data: 1,
                    index: 0,
                },
                {
                    data: 2,
                    index: 1,
                }
            ],
            added: [
                {
                    data: 4,
                    nextIndex: 2,
                }
            ],
            deleted: [
                {
                    data: 3,
                    prevIndex: 2,
                }
            ],
            moved: [],
            updated: []
        });
    });

    it('equals', () => {
        const result = objectDiff({a: 1, b: 2}, {a: 1, b: 2});
        expect(result).toStrictEqual({type: "object"});
    });

    it('nested equals', () => {
        const result = objectDiff({a: 1, b: {c: 1}}, {a: 1, b: {c: 1}});
        expect(result).toStrictEqual({type: "object"});
    });

    it('primitive values', () => {
        const result = objectDiff(1 as any, {a: 1});
        assert(result.type === "object");
        expect(result.added).toStrictEqual({
            a: {
                propertyName: 'a',
                value: 1
            }
        });

        const result2 = objectDiff({a: 1}, 1 as any);
        assert(result2.type === "object");
        expect(result2.deleted).toStrictEqual({
            a: {
                propertyName: 'a',
                value: 1
            }
        });
    });

    it('circular references', () => {
        const obj1: any = {a: 1};
        obj1.self = obj1; // Create circular reference

        const obj2: any = {a: 2};
        obj2.self = obj2; // Create circular reference

        const result = objectDiff(obj1, obj2);
        expect(result).toStrictEqual({
            type: "object",
            updated: {
                a: {
                    propertyName: 'a',
                    prevValue: 1,
                    nextValue: 2,
                    diff: undefined
                },
                self: {
                    propertyName: 'self',
                    prevValue: obj1,
                    nextValue: obj2,
                    diff: {
                        type: "circular reference",
                    }
                }
            }
        });
    });

    it('nested circular references', () => {
        const obj1: any = {a: {b: 1}};
        obj1.a.self = obj1; // Create nested circular reference

        const obj2: any = {a: {b: 2}};
        obj2.a.self = obj2; // Create nested circular reference

        const result = objectDiff(obj1, obj2);
        expect(result).toStrictEqual({
            type: "object",
            updated: {
                a: {
                    propertyName: 'a',
                    prevValue: {
                        b: 1,
                        self: obj1
                    },
                    nextValue: {
                        b: 2,
                        self: obj2
                    },
                    diff: {
                        type: "object",
                        updated: {
                            b: {
                                propertyName: 'b',
                                prevValue: 1,
                                nextValue: 2,
                                diff: undefined
                            },
                            self: {
                                propertyName: 'self',
                                prevValue: obj1,
                                nextValue: obj2,
                                diff: {
                                    type: "circular reference",
                                }
                            }
                        }
                    }
                },
            }
        });
    });

    it('nested null/undefined', () => {
        const result = objectDiff(
            {a: null, b: undefined, c: 1},
            {a: null, b: 2, c: 1}
        );

        expect(result).toStrictEqual({
            type: "object",
            updated: {
                b: {
                    propertyName: 'b',
                    prevValue: undefined,
                    nextValue: 2,
                    diff: undefined,
                }
            }
        });
    });

    it('custom deepMatchFn', () => {
        const customNameMatch = [
            (a: any, b: any): boolean => {
                if (
                    "name" in a && typeof a.name === "string" &&
                    "name" in b && typeof b.name === "string"
                ) return a.name === b.name
                return false
            }
        ]

        const result = objectDiff(
            {
                a: [
                    {
                        name: "item1",
                        value: "value1",
                        nestArray: [
                            {
                                name: "item1-1",
                                value: "value1-1"
                            }
                        ]
                    },
                ]
            },
            {
                a: [
                    {
                        name: "item1",
                        value: "new value",
                        nestArray: [
                            {
                                name: "item1-2",
                                value: "value1-2"
                            },
                            {
                                name: "item1-1",
                                value: "new value"
                            },
                        ]
                    }
                ]
            },
            customNameMatch
        );

        assert(result.type === "object")
        assert(result.updated?.a?.diff?.updated?.[0]?.diff?.type === "object")
        const nestArrayDiff: ArrayDiff<{
            name: string,
            value: string,
        }> = {
            type: "array",
            added: [
                {
                    data: {
                        name: "item1-2",
                        value: "value1-2",
                    },
                    nextIndex: 0,
                },
            ],
            deleted: [],
            equals: [],
            moved: [],
            updated: [
                {
                    prevData: {
                        name: "item1-1",
                        value: "value1-1",
                    },
                    prevIndex: 0,
                    nextData: {
                        name: "item1-1",
                        value: "new value",
                    },
                    nextIndex: 1,
                    diff: {
                        type: "object",
                        updated: {
                            value: {
                                propertyName: 'value',
                                prevValue: "value1-1",
                                nextValue: "new value",
                                diff: undefined,
                            }
                        }
                    }
                },
            ],
        }
        expect(
            result.updated
                ?.a?.diff?.updated
                ?.[0]?.diff?.updated
                ?.nestArray?.diff
        ).toStrictEqual(nestArrayDiff)
    });
});
