import {describe, it, expect} from 'vitest';
import {objectDiff} from '../objectDiff';

describe('objectDiff', () => {
    it('empty object', () => {
        expect(objectDiff({}, {})).toEqual({});
        expect(objectDiff(null, null)).toEqual({});
        expect(objectDiff(undefined, undefined)).toEqual({});
        expect(objectDiff({}, null)).toEqual({});
        expect(objectDiff(null, {})).toEqual({});
        expect(objectDiff({}, undefined)).toEqual({});
        expect(objectDiff(undefined, {})).toEqual({});
    });

    it('empty added', () => {
        const result = objectDiff(null, {a: 1, b: 2});
        expect(result).toEqual({
            added: {
                a: {propertyName: 'a', value: 1},
                b: {propertyName: 'b', value: 2}
            }
        });
    });

    it('empty deleted', () => {
        const result = objectDiff({a: 1, b: 2}, null);
        expect(result).toEqual({
            deleted: {
                a: {propertyName: 'a', value: 1},
                b: {propertyName: 'b', value: 2}
            }
        });
    });

    it('added', () => {
        const result = objectDiff({a: 1}, {a: 1, b: 2});
        expect(result).toEqual({
            added: {
                b: {propertyName: 'b', value: 2}
            }
        });
    });

    it('deleted', () => {
        const result = objectDiff({a: 1, b: 2}, {a: 1});
        expect(result).toEqual({
            deleted: {
                b: {propertyName: 'b', value: 2}
            }
        });
    });

    it('updated', () => {
        const result = objectDiff({a: 1, b: 2}, {a: 1, b: 3});
        expect(result).toEqual({
            updated: {
                b: {
                    propertyName: 'b',
                    prevValue: 2,
                    nextValue: 3
                }
            }
        });
    });

    it('multi', () => {
        const result = objectDiff(
            {a: 1, b: 2, c: 5},
            {a: 1, b: 3, d: 4}
        );
        expect(result).toEqual({
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
                    nextValue: 3
                }
            }
        });
    });

    it('nested', () => {
        const oldObj = {a: {b: 1}};
        const newObj = {a: {b: 2}};
        const result = objectDiff(oldObj, newObj);

        expect(result).toEqual({
            updated: {
                a: {
                    propertyName: 'a',
                    prevValue: {b: 1},
                    nextValue: {b: 2},
                    diff: {
                        updated: {
                            b: {
                                propertyName: 'b',
                                prevValue: 1,
                                nextValue: 2
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

        expect(result.updated).toBeDefined();
        expect(result.updated?.items).toBeDefined();
        expect(result.updated?.items?.diff).toStrictEqual({
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
        expect(result).toEqual({});
    });

    it('nested equals', () => {
        const result = objectDiff({a: 1, b: {c: 1}}, {a: 1, b: {c: 1}});
        expect(result).toEqual({});
    });

    it('primitive values', () => {
        const result = objectDiff(1 as any, {a: 1});
        expect(result.added).toBeDefined();

        const result2 = objectDiff({a: 1}, 1 as any);
        expect(result2.deleted).toBeDefined();
    });

    it('circular references', () => {
        const obj1: any = {a: 1};
        obj1.self = obj1; // Create circular reference

        const obj2: any = {a: 2};
        obj2.self = obj2; // Create circular reference

        const result = objectDiff(obj1, obj2);
        expect(result).toStrictEqual({
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
                    diff: {}
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
                                diff: {}
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

        expect(result).toEqual({
            updated: {
                b: {
                    propertyName: 'b',
                    prevValue: undefined,
                    nextValue: 2
                }
            }
        });
    });

    it('custom deepKeyFn', () => {
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

        expect(result.updated?.a?.diff?.updated?.[0]?.diff?.updated?.nestArray?.diff).toStrictEqual({
            added: [
                {
                    data: {
                        name: "item1-2",
                        value: "value1-2",
                    },
                    nextIndex: 0,
                },
                {
                    data: {
                        name: "item1-1",
                        value: "new value",
                    },
                    nextIndex: 1,
                },
            ],
            deleted: [
                {
                    data: {
                        name: "item1-1",
                        value: "value1-1",
                    },
                    prevIndex: 0,
                },
            ],
            equals: [],
            moved: [],
            updated: [],
        })
    });
});
