import {describe, it, expect} from 'vitest'
import {arrayDiff} from "../arrayDiff";
import {commonDiffKey} from "../commonDiffKey";

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

const itemToKey = (item: TestItem) => item.name

describe('arrayDiff', () => {
    // 测试两个列表都为空的情况
    it('empty/null/undefined', () => {
        const result = arrayDiff<TestItem>([], [], itemToKey)
        expect(result).toEqual({
            added: [],
            updated: [],
            deleted: [],
            moved: [],
            equals: []
        })

        const result1 = arrayDiff<TestItem>(null, null, itemToKey)
        expect(result1).toEqual({
            added: [],
            updated: [],
            deleted: [],
            moved: [],
            equals: []
        })

        const result2 = arrayDiff<TestItem>(undefined, undefined, itemToKey)
        expect(result2).toEqual({
            added: [],
            updated: [],
            deleted: [],
            moved: [],
            equals: []
        })
    })

    // 测试前一个列表为空，后一个列表有数据
    it('all added', () => {
        const nextList: TestItem[] = [
            {name: 'item1', value: 'value1'},
            {name: 'item2', value: 'value2'}
        ]

        const result = arrayDiff<TestItem>(null, nextList, itemToKey)
        expect(result.added).toEqual([
            {data: {name: 'item1', value: 'value1'}, nextIndex: 0},
            {data: {name: 'item2', value: 'value2'}, nextIndex: 1}
        ])
        expect(result.updated).toEqual([])
        expect(result.deleted).toEqual([])
        expect(result.moved).toEqual([])
        expect(result.equals).toEqual([])
    })

    // 测试后一个列表为空，前一个列表有数据
    it('all deleted', () => {
        const prevList: TestItem[] = [
            {name: 'item1', value: 'value1'},
            {name: 'item2', value: 'value2'}
        ]

        const result = arrayDiff<TestItem>(prevList, null, itemToKey)
        expect(result.deleted).toEqual([
            {data: {name: 'item1', value: 'value1'}, prevIndex: 0},
            {data: {name: 'item2', value: 'value2'}, prevIndex: 1}
        ])
        expect(result.added).toEqual([])
        expect(result.updated).toEqual([])
        expect(result.moved).toEqual([])
        expect(result.equals).toEqual([])
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

        const result = arrayDiff<TestItem>(prevList, nextList, itemToKey)
        expect(result.equals).toEqual([
            {data: {name: 'item1', value: 'value1'}, index: 0},
            {data: {name: 'item2', value: 'value2'}, index: 1}
        ])
        expect(result.added).toEqual([])
        expect(result.updated).toEqual([])
        expect(result.deleted).toEqual([])
        expect(result.moved).toEqual([])
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

        const result = arrayDiff<TestItem>(prevList, nextList, itemToKey)
        expect(result.moved).toEqual([
            {data: {name: 'item3', value: 'value3'}, prevIndex: 2, nextIndex: 0},
            {data: {name: 'item1', value: 'value1'}, prevIndex: 0, nextIndex: 1},
            {data: {name: 'item2', value: 'value2'}, prevIndex: 1, nextIndex: 2}
        ])
        expect(result.equals).toEqual([]) // 所有项目都移动了，没有保持原位置的
        expect(result.added).toEqual([])
        expect(result.updated).toEqual([])
        expect(result.deleted).toEqual([])
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

        const result = arrayDiff<TestItem>(prevList, nextList, itemToKey)
        expect(result.added).toEqual([
            {data: {name: 'item2', value: 'value2'}, nextIndex: 1},
            {data: {name: 'item3', value: 'value3'}, nextIndex: 2}
        ])
        expect(result.equals).toEqual([
            {data: {name: 'item1', value: 'value1'}, index: 0}
        ])
        expect(result.deleted).toEqual([])
        expect(result.updated).toEqual([])
        expect(result.moved).toEqual([])
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

        const result = arrayDiff<TestItem>(prevList, nextList, itemToKey)
        const updatedExpect: ArrayUpdatedDiffItem<TestItem>[] = [
            {
                prevData: {name: 'item1', value: 'oldValue'},
                prevIndex: 0,
                nextData: {name: 'item1', value: 'newValue'},
                nextIndex: 0,
                diff: {
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
        expect(result.equals).toEqual([
            {data: {name: 'item2', value: 'value2'}, index: 1}
        ])
        expect(result.added).toEqual([])
        expect(result.deleted).toEqual([])
        expect(result.moved).toEqual([])
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

        const result = arrayDiff<TestItem>(prevList, nextList, itemToKey)
        expect(result.deleted).toEqual([
            {data: {name: 'item2', value: 'value2'}, prevIndex: 1},
            {data: {name: 'item3', value: 'value3'}, prevIndex: 2}
        ])
        expect(result.equals).toEqual([
            {data: {name: 'item1', value: 'value1'}, index: 0}
        ])
        expect(result.added).toEqual([])
        expect(result.updated).toEqual([])
        expect(result.moved).toEqual([])
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

        const result = arrayDiff<TestItem>(prevList, nextList, itemToKey)

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
            it => it.name,
            it => {
                if ("name" in it && typeof it.name === "string") return it.name
                return commonDiffKey(it)
            }
        )
        expect(result.updated.length).toBe(1)
        const nestDiffExpect: ObjectDiff<NestTestItem> = {
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
                        updated: {
                            description: {
                                propertyName: 'description',
                                prevValue: 'old description',
                                nextValue: 'new description',
                                diff: undefined
                            },
                            nestArray: {
                                propertyName: 'nestArray',
                                prevValue:  [
                                    {name: 'item1', value: 'value1'},
                                    {name: 'item2', value: 'value2'},
                                    {name: 'item3', value: 'value3'}
                                ],
                                nextValue: [
                                    {name: 'item1', value: 'value1'},
                                    {name: 'item3', value: 'new value'},
                                ],
                                diff: {
                                    added: [],
                                    updated: [
                                        {
                                            prevData: {name: 'item3', value: 'value3'},
                                            prevIndex: 2,
                                            nextData: {name: 'item3', value: 'new value'},
                                            nextIndex: 1,
                                            diff: {
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
