import {describe, it, expect} from 'vitest'
import {arrayDiff} from "../arrayDiff";

// 定义测试数据类型
type TestItem = DeepReadonly<{
    name: string
    value: string
    count?: number
}>

type NestTestItem = DeepReadonly<{
    name: string
    details: {
        id: number
        description: string,
        nestArray: {
            name: string,
            value: string
        }[]
    }
}>

const nameMatch = [
    (a: { name: string }, b: { name: string }) => a.name === b.name
]

const nameValueMatch = [
    (a: { name: string }, b: { name: string }) => a.name === b.name,
    (a: { value: string }, b: { value: string }) => a.value === b.value
]

const customNameMatch = [
    (a: any, b: any): boolean => {
        if (
            "name" in a && typeof a.name === "string" &&
            "name" in b && typeof b.name === "string"
        ) return a.name === b.name
        return false
    }
]

describe('arrayDiff', () => {
    // 测试两个列表都为空的情况
    it('empty/null/undefined', () => {
        const emptyArrayDiff: ArrayDiff<TestItem> = {
            type: "array",
            added: [],
            updated: [],
            deleted: [],
            moved: [],
            equals: []
        }
        const result = arrayDiff<TestItem>([], [], nameMatch)
        expect(result).toStrictEqual(emptyArrayDiff)
        const result1 = arrayDiff<TestItem>(null, null, nameMatch)
        expect(result1).toStrictEqual(emptyArrayDiff)
        const result2 = arrayDiff<TestItem>(undefined, undefined, nameMatch)
        expect(result2).toStrictEqual(emptyArrayDiff)
    })

    // 测试前一个列表为空，后一个列表有数据
    it('all added', () => {
        const nextList: TestItem[] = [
            {name: 'item1', value: 'value1'},
            {name: 'item2', value: 'value2'}
        ]

        const result = arrayDiff<TestItem>(null, nextList, nameMatch)
        expect(result.added).toStrictEqual([
            {data: {name: 'item1', value: 'value1'}, nextIndex: 0},
            {data: {name: 'item2', value: 'value2'}, nextIndex: 1}
        ])
        expect(result.updated).toStrictEqual([])
        expect(result.deleted).toStrictEqual([])
        expect(result.moved).toStrictEqual([])
        expect(result.equals).toStrictEqual([])
    })

    // 测试后一个列表为空，前一个列表有数据
    it('all deleted', () => {
        const prevList: TestItem[] = [
            {name: 'item1', value: 'value1'},
            {name: 'item2', value: 'value2'}
        ]

        const result = arrayDiff<TestItem>(prevList, null, nameMatch)
        expect(result.deleted).toStrictEqual([
            {data: {name: 'item1', value: 'value1'}, prevIndex: 0},
            {data: {name: 'item2', value: 'value2'}, prevIndex: 1}
        ])
        expect(result.added).toStrictEqual([])
        expect(result.updated).toStrictEqual([])
        expect(result.moved).toStrictEqual([])
        expect(result.equals).toStrictEqual([])
    })

    // 测试相等的项目
    it('equals', () => {
        const prevList: TestItem[] = [
            {name: 'item1', value: 'value1'},
            {name: 'item2', value: 'value2'}
        ]

        const nextList: TestItem[] = [
            {name: 'item1', value: 'value1'},
            {name: 'item2', value: 'value2'}
        ]

        const result = arrayDiff<TestItem>(prevList, nextList, nameMatch)
        expect(result.equals).toStrictEqual([
            {data: {name: 'item1', value: 'value1'}, index: 0},
            {data: {name: 'item2', value: 'value2'}, index: 1}
        ])
        expect(result.added).toStrictEqual([])
        expect(result.updated).toStrictEqual([])
        expect(result.deleted).toStrictEqual([])
        expect(result.moved).toStrictEqual([])
    })

    // 测试项目位置移动
    it('moved', () => {
        const prevList: TestItem[] = [
            {name: 'item1', value: 'value1'},
            {name: 'item2', value: 'value2'},
            {name: 'item3', value: 'value3'}
        ]

        const nextList: TestItem[] = [
            {name: 'item3', value: 'value3'}, // 从index 2移动到index 0
            {name: 'item1', value: 'value1'}, // 从index 0移动到index 1
            {name: 'item2', value: 'value2'}  // 从index 1移动到index 2
        ]

        const result = arrayDiff<TestItem>(prevList, nextList, nameMatch)
        expect(result.moved).toStrictEqual([
            {data: {name: 'item1', value: 'value1'}, prevIndex: 0, nextIndex: 1},
            {data: {name: 'item2', value: 'value2'}, prevIndex: 1, nextIndex: 2},
            {data: {name: 'item3', value: 'value3'}, prevIndex: 2, nextIndex: 0},
        ])
        expect(result.equals).toStrictEqual([]) // 所有项目都移动了，没有保持原位置的
        expect(result.added).toStrictEqual([])
        expect(result.updated).toStrictEqual([])
        expect(result.deleted).toStrictEqual([])
    })

    it('added', () => {
        const prevList: TestItem[] = [
            {name: 'item1', value: 'value1'}
        ]

        const nextList: TestItem[] = [
            {name: 'item1', value: 'value1'},
            {name: 'item2', value: 'value2'}, // 新增
            {name: 'item3', value: 'value3'}  // 新增
        ]

        const result = arrayDiff<TestItem>(prevList, nextList, nameMatch)
        expect(result.added).toStrictEqual([
            {data: {name: 'item2', value: 'value2'}, nextIndex: 1},
            {data: {name: 'item3', value: 'value3'}, nextIndex: 2}
        ])
        expect(result.equals).toStrictEqual([
            {data: {name: 'item1', value: 'value1'}, index: 0}
        ])
        expect(result.deleted).toStrictEqual([])
        expect(result.updated).toStrictEqual([])
        expect(result.moved).toStrictEqual([])
    })

    it('updated', () => {
        const prevList: TestItem[] = [
            {name: 'item1', value: 'oldValue'},
            {name: 'item2', value: 'value2'}
        ]

        const nextList: TestItem[] = [
            {name: 'item1', value: 'newValue'},  // 更新
            {name: 'item2', value: 'value2'}     // 相等
        ]

        const result = arrayDiff<TestItem>(prevList, nextList, nameMatch)
        const updatedExpect: ArrayUpdatedDiffItem<TestItem>[] = [
            {
                prevData: {name: 'item1', value: 'oldValue'},
                prevIndex: 0,
                nextData: {name: 'item1', value: 'newValue'},
                nextIndex: 0,
                diff: {
                    type: "object",
                    updated: {
                        value: {
                            propertyName: 'value',
                            prevValue: 'oldValue',
                            nextValue: 'newValue',
                            diff: undefined
                        }
                    }
                }
            }
        ]
        expect(result.updated).toStrictEqual(updatedExpect)
        expect(result.equals).toStrictEqual([
            {data: {name: 'item2', value: 'value2'}, index: 1}
        ])
        expect(result.added).toStrictEqual([])
        expect(result.deleted).toStrictEqual([])
        expect(result.moved).toStrictEqual([])
    })

    it('deleted', () => {
        const prevList: TestItem[] = [
            {name: 'item1', value: 'value1'},
            {name: 'item2', value: 'value2'},
            {name: 'item3', value: 'value3'}
        ]

        const nextList: TestItem[] = [
            {name: 'item1', value: 'value1'} // 只保留了item1
        ]

        const result = arrayDiff<TestItem>(prevList, nextList, nameMatch)
        expect(result.deleted).toStrictEqual([
            {data: {name: 'item2', value: 'value2'}, prevIndex: 1},
            {data: {name: 'item3', value: 'value3'}, prevIndex: 2}
        ])
        expect(result.equals).toStrictEqual([
            {data: {name: 'item1', value: 'value1'}, index: 0}
        ])
        expect(result.added).toStrictEqual([])
        expect(result.updated).toStrictEqual([])
        expect(result.moved).toStrictEqual([])
    })

    it('multiple changes', () => {
        const prevList: TestItem[] = [
            {name: 'item1', value: 'value1'},          // 相等
            {name: 'item2', value: 'value2'},          // 更新
            {name: 'item3', value: 'value3'},          // 删除
            {name: 'item4', value: 'value4'}           // 移动
        ]

        const nextList: TestItem[] = [
            {name: 'item1', value: 'value1'},           // 相等
            {name: 'item2', value: 'newValue'},         // 更新
            {name: 'item4', value: 'value4'},           // 移动
            {name: 'item5', value: 'value5'},           // 新增
        ]

        const result = arrayDiff<TestItem>(prevList, nextList, nameMatch)

        // 验证各个数组的长度
        expect(result.equals.length).toBe(1)
        expect(result.added.length).toBe(1)
        expect(result.updated.length).toBe(1)
        expect(result.deleted.length).toBe(1)
        expect(result.moved.length).toBe(1)

        // 验证具体值
        expect(result.equals[0]?.data.name).toBe('item1')
        expect(result.added[0]?.data.name).toBe('item5')
        expect(result.updated[0]?.prevData.name).toBe('item2')
        expect(result.deleted[0]?.data.name).toBe('item3')
        expect(result.moved[0]?.data.name).toBe('item4')
    })

    it('multi match', () => {
        const prevList: TestItem[] = [
            {name: 'item1', value: 'value1'},          // 相等
            {name: 'item2', value: 'value2'},          // 更新
            {name: 'item3', value: 'value3'},          // 删除
            {name: 'item4', value: 'value4'}           // 移动
        ]

        const nextList: TestItem[] = [
            {name: 'item1', value: 'value1'},           // 相等
            {name: 'new item2', value: 'value2'},       // 更新，但有name匹配的，因此不实际新增
            {name: 'item2', value: 'newValue'},         // 更新 by value
            {name: 'item5', value: 'value4'},           // 更新 by name
        ]

        const result = arrayDiff<TestItem>(prevList, nextList, nameValueMatch)

        // 验证各个数组的长度
        expect(result.equals.length).toBe(1)
        expect(result.added.length).toBe(1)
        expect(result.updated.length).toBe(2)
        expect(result.deleted.length).toBe(1)
        expect(result.moved.length).toBe(0)

        expect(result.updated).toStrictEqual([
            {
                prevData: {
                    name: "item2",
                    value: "value2",
                },
                prevIndex: 1,
                nextData: {
                    name: "item2",
                    value: "newValue",
                },
                nextIndex: 2,
                diff: {
                    type: "object",
                    updated: {
                        value: {
                            propertyName: "value",
                            prevValue: "value2",
                            nextValue: "newValue",
                            diff: undefined,
                        },
                    },
                },
            },
            {

                prevData: {
                    name: "item4",
                    value: "value4",
                },
                prevIndex: 3,
                nextData: {
                    name: "item5",
                    value: "value4",
                },
                nextIndex: 3,
                diff: {
                    type: "object",
                    updated: {
                        name: {
                            propertyName: "name",
                            prevValue: "item4",
                            nextValue: "item5",
                            diff: undefined,
                        },
                    },
                },
            },
        ])

        expect(result.added).toStrictEqual([
            {
                data: {
                    name: "new item2",
                    value: "value2",
                },
                nextIndex: 1,
            }
        ])
    })

    // 测试具有嵌套对象的复杂更新
    it('nested', () => {
        const prevList: NestTestItem[] = [
            {
                name: 'item1',
                details: {
                    id: 1,
                    description: 'old description',
                    nestArray: [
                        {name: 'item1', value: 'value1'},
                        {name: 'item2', value: 'value2'},
                        {name: 'item3', value: 'value3'}
                    ]
                }
            }
        ]

        const nextList: NestTestItem[] = [
            {
                name: 'item1',
                details: {
                    id: 1,
                    description: 'new description',  // updated
                    nestArray: [
                        {name: 'item1', value: 'value1'},
                        {name: 'item3', value: 'new value'}, // moved, changed, item2 deleted
                    ]
                }
            }
        ]

        const result = arrayDiff<NestTestItem>(
            prevList,
            nextList,
            nameMatch,
            customNameMatch,
        )
        expect(result.updated.length).toBe(1)
        const nestDiffExpect: ObjectDiff<NestTestItem> = {
            type: 'object',
            updated: {
                details: {
                    propertyName: 'details',
                    prevValue: {
                        id: 1,
                        description: 'old description',
                        nestArray: [
                            {name: 'item1', value: 'value1'},
                            {name: 'item2', value: 'value2'},
                            {name: 'item3', value: 'value3'}
                        ]
                    },
                    nextValue: {
                        id: 1,
                        description: 'new description',
                        nestArray: [
                            {name: 'item1', value: 'value1'},
                            {name: 'item3', value: 'new value'},
                        ]
                    },
                    diff: {
                        type: 'object',
                        updated: {
                            description: {
                                propertyName: 'description',
                                prevValue: 'old description',
                                nextValue: 'new description',
                                diff: undefined
                            },
                            nestArray: {
                                propertyName: 'nestArray',
                                prevValue: [
                                    {name: 'item1', value: 'value1'},
                                    {name: 'item2', value: 'value2'},
                                    {name: 'item3', value: 'value3'}
                                ],
                                nextValue: [
                                    {name: 'item1', value: 'value1'},
                                    {name: 'item3', value: 'new value'},
                                ],
                                diff: {
                                    type: 'array',
                                    added: [],
                                    updated: [
                                        {
                                            prevData: {name: 'item3', value: 'value3'},
                                            prevIndex: 2,
                                            nextData: {name: 'item3', value: 'new value'},
                                            nextIndex: 1,
                                            diff: {
                                                type: 'object',
                                                updated: {
                                                    value: {
                                                        propertyName: 'value',
                                                        prevValue: 'value3',
                                                        nextValue: 'new value',
                                                        diff: undefined
                                                    }
                                                }
                                            }
                                        }
                                    ],
                                    deleted: [
                                        {data: {name: 'item2', value: 'value2'}, prevIndex: 1},
                                    ],
                                    moved: [],
                                    equals: [
                                        {data: {name: 'item1', value: 'value1'}, index: 0}
                                    ]
                                }
                            }
                        }
                    }
                }
            },
        }
        expect(result.updated[0]?.diff).toStrictEqual(nestDiffExpect)
    })
})
