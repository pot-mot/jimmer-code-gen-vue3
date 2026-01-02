import {describe, it, expect} from 'vitest'
import {listDiff} from "../listDiff";

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
        description: string
    }
}>

const itemToKey = (item: TestItem) => item.name

describe('listDiff', () => {
    // 测试两个列表都为空的情况
    it('empty/null/undefined', () => {
        const result = listDiff<TestItem>([], [], itemToKey)
        expect(result).toEqual({
            added: [],
            updated: [],
            deleted: [],
            moved: [],
            equals: []
        })

        const result1 = listDiff<TestItem>(null, null, itemToKey)
        expect(result1).toEqual({
            added: [],
            updated: [],
            deleted: [],
            moved: [],
            equals: []
        })

        const result2 = listDiff<TestItem>(undefined, undefined, itemToKey)
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

        const result = listDiff<TestItem>(null, nextList, itemToKey)
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

        const result = listDiff<TestItem>(prevList, null, itemToKey)
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

        const result = listDiff<TestItem>(prevList, nextList, itemToKey)
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

        const result = listDiff<TestItem>(prevList, nextList, itemToKey)
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

        const result = listDiff<TestItem>(prevList, nextList, itemToKey)
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

        const result = listDiff<TestItem>(prevList, nextList, itemToKey)
        expect(result.updated).toStrictEqual([
            {
                prevData: {name: 'item1', value: 'oldValue'},
                prevIndex: 0,
                nextData: {name: 'item1', value: 'newValue'},
                nextIndex: 0,
                diff: [
                    {
                        property: "value",
                        previousValue: 'oldValue',
                        currentValue: 'newValue',
                        status: "updated",
                    }
                ]
            }
        ])
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

        const result = listDiff<TestItem>(prevList, nextList, itemToKey)
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

        const result = listDiff<TestItem>(prevList, nextList, itemToKey)

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
                details: {id: 1, description: 'old description'}
            }
        ]

        const nextList: NestTestItem[] = [
            {
                name: 'item1',
                details: {id: 1, description: 'new description'}  // 仅description变化
            }
        ]

        const result = listDiff<NestTestItem>(prevList, nextList, it => it.name)
        expect(result.updated.length).toBe(1)
        expect(result.updated[0]?.prevData.name).toBe('item1')
        expect(result.updated[0]?.prevData.details.description).toBe('old description')
        expect(result.updated[0]?.nextData.name).toBe('item1')
        expect(result.updated[0]?.nextData.details.description).toBe('new description')
        expect(result.updated[0]?.diff).toStrictEqual([
            {
                property: "details",
                previousValue: {
                    id: 1,
                    description: 'old description'
                },
                currentValue: {
                    id: 1,
                    description: 'new description'
                },
                status: "updated",
                diff: [
                    {
                        property: "description",
                        previousValue: 'old description',
                        currentValue: 'new description',
                        status: "updated",
                    }
                ]
            }
        ])
    })
})
