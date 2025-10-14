import {describe, it, expect} from 'vitest'
import {
    defaultInheritInfo,
    type InheritInfo,
    type InheritInfoSync,
    type InheritItem, useInheritInfoSync
} from "@/type/context/utils/InheritInfo.ts";

describe('EntityInheritInfo', () => {
    const buildInheritInfo = (
        abstractMap: DeepReadonly<Map<string, InheritItem>>,
        concreteMap: DeepReadonly<Map<string, InheritItem>>,
    ): {
        data: InheritInfo,
        sync: InheritInfoSync,
    } => {
        const data = defaultInheritInfo(abstractMap, concreteMap)
        const sync = useInheritInfoSync(data)

        return {
            data,
            sync,
        }
    }

    // 创建测试数据，使用数字格式ID
    const abstractMap: DeepReadonly<Map<string, InheritItem>> = new Map([
        ['1', {id: '1', extendsIds: []}],
        ['1-1', {id: '1-1', extendsIds: ['1']}],
        ['1-2', {id: '1-2', extendsIds: ['1']}],
        ['1-1-1', {id: '1-1-1', extendsIds: ['1-1']}]
    ])

    const concreteMap: DeepReadonly<Map<string, InheritItem>> = new Map([
        ['1-1-1-1', {id: '1-1-1-1', extendsIds: ['1-1-1']}],
        ['1-1-2', {id: '1-1-2', extendsIds: ['1-1']}],
        ['1-2-1', {id: '1-2-1', extendsIds: ['1-2']}],
        ['1-2-2', {id: '1-2-2', extendsIds: ['1-2']}]
    ])

    it('build inherit info', () => {
        const {data} = buildInheritInfo(abstractMap, concreteMap)

        // 验证抽象实体继承信息
        const rootInfo = data.abstractInheritInfoMap.get('1')
        expect(rootInfo).toBeDefined()
        expect(rootInfo?.parentIdSet.size).toBe(0)
        expect(rootInfo?.ancestorIdSet.size).toBe(0)
        expect(rootInfo?.abstractChildIdSet).toContain('1-1')
        expect(rootInfo?.abstractChildIdSet).toContain('1-2')
        expect(rootInfo?.concreteChildIdSet.size).toBe(0)
        expect(rootInfo?.allAbstractChildIdSet).toContain('1-1')
        expect(rootInfo?.allAbstractChildIdSet).toContain('1-2')
        expect(rootInfo?.allAbstractChildIdSet).toContain('1-1-1')
        expect(rootInfo?.allConcreteChildIdSet).toContain('1-1-1-1')
        expect(rootInfo?.allConcreteChildIdSet).toContain('1-1-2')
        expect(rootInfo?.allConcreteChildIdSet).toContain('1-2-1')
        expect(rootInfo?.allConcreteChildIdSet).toContain('1-2-2')

        // 验证具体实体继承信息
        const concreteInfo = data.concreteInheritInfoMap.get('1-1-1-1')
        expect(concreteInfo).toBeDefined()
        expect(concreteInfo?.parentIdSet).toContain('1-1-1')
        expect(concreteInfo?.ancestorIdSet).toContain('1-1-1')
        expect(concreteInfo?.ancestorIdSet).toContain('1-1')
        expect(concreteInfo?.ancestorIdSet).toContain('1')
    })

    it('sync abstract entity', () => {
        const {data, sync} = buildInheritInfo(abstractMap, concreteMap)

        // 添加新的抽象实体
        const newAbstractItem = {id: '1-3', extendsIds: ['1']}
        sync.syncAbstract(newAbstractItem)

        const rootInfo = data.abstractInheritInfoMap.get('1')
        expect(rootInfo?.abstractChildIdSet).toContain('1-3')
    })

    it('sync concrete entity', () => {
        const {data, sync} = buildInheritInfo(abstractMap, concreteMap)

        const newAbstractItem = {id: '1-3', extendsIds: ['1']}
        sync.syncAbstract(newAbstractItem)
        const newConcreteItem = {id: '1-3-1', extendsIds: ['1-3']}
        sync.syncConcrete(newConcreteItem)

        const concreteInfo = data.concreteInheritInfoMap.get('1-3-1')
        expect(concreteInfo).toBeDefined()
        expect(concreteInfo?.parentIdSet).toContain('1-3')
        const abstractInfo = data.abstractInheritInfoMap.get('1-3')
        expect(abstractInfo?.concreteChildIdSet).toContain('1-3-1')
        expect(abstractInfo?.allConcreteChildIdSet).toContain('1-3-1')
    })

    it('remove abstract entity', () => {
        const {data, sync} = buildInheritInfo(abstractMap, concreteMap)

        sync.removeAbstract('1-2')

        expect(data.abstractInheritInfoMap.size).toBe(3)
        expect(data.abstractInheritInfoMap.has('1')).toBeTruthy()
        expect(data.abstractInheritInfoMap.has('1-1')).toBeTruthy()
        expect(data.abstractInheritInfoMap.has('1-1-1')).toBeTruthy()

        for (const childInfo of data.abstractInheritInfoMap.values()) {
            expect(childInfo.parentIdSet).not.toContain('1-2')
            expect(childInfo.ancestorIdSet).not.toContain('1-2')
            expect(childInfo.abstractChildIdSet).not.toContain('1-2')
            expect(childInfo.allAbstractChildIdSet).not.toContain('1-2')
        }

        expect(data.concreteInheritInfoMap.size).toBe(4)
        expect(data.concreteInheritInfoMap.has('1-1-1-1')).toBeTruthy()
        expect(data.concreteInheritInfoMap.has('1-1-2')).toBeTruthy()
        expect(data.concreteInheritInfoMap.has('1-2-1')).toBeTruthy()
        expect(data.concreteInheritInfoMap.has('1-2-2')).toBeTruthy()

        for (const childInfo of data.concreteInheritInfoMap.values()) {
            expect(childInfo.parentIdSet).not.toContain('1-2')
            expect(childInfo.ancestorIdSet).not.toContain('1-2')
        }
    })

    it('remove concrete entity', () => {
        const {data, sync} = buildInheritInfo(abstractMap, concreteMap)

        sync.removeConcrete('1-1-2')

        const childInfo = data.abstractInheritInfoMap.get('1-1')
        expect(childInfo?.concreteChildIdSet).not.toContain('1-1-2')
        expect(childInfo?.allConcreteChildIdSet).not.toContain('1-1-2')
        const rootInfo = data.abstractInheritInfoMap.get('1')
        expect(rootInfo?.concreteChildIdSet).not.toContain('1-1-2')
        expect(rootInfo?.allConcreteChildIdSet).not.toContain('1-1-2')
    })

    it('missing dependencies', () => {
        // 创建包含缺失依赖的测试数据
        const abstractMapWithMissing: DeepReadonly<Map<string, InheritItem>> = new Map([
            ['1', {id: '1', extendsIds: []}],
            ['2', {id: '2', extendsIds: ['1', '3', '4']}] // 依赖不存在的 '3' 和 并不是抽象实体的 ‘4’
        ])

        const concreteMapWithMissing: DeepReadonly<Map<string, InheritItem>> = new Map([
            ['4', {id: '4', extendsIds: ['5', '6']}] // 依赖不存在的 '5', '6
        ])

        const {data} = buildInheritInfo(abstractMapWithMissing, concreteMapWithMissing)

        // 验证缺失依赖被正确记录
        expect(data.missingDependencies.size).toBe(2)

        expect(data.missingDependencies.get('2')?.size).toBe(2)
        expect(data.missingDependencies.get('2')).toContain('3')
        expect(data.missingDependencies.get('2')).toContain('4')

        expect(data.missingDependencies.get('4')?.size).toBe(2)
        expect(data.missingDependencies.get('4')).toContain('5')
        expect(data.missingDependencies.get('4')).toContain('6')
    })

    it('sync abstract entity with missing dependencies', () => {
        const {data, sync} = buildInheritInfo(abstractMap, concreteMap)

        // 同步一个有缺失依赖的抽象实体
        const newItemWithMissing = {id: '6', extendsIds: ['7']} // 依赖不存在的 '7'
        sync.syncAbstract(newItemWithMissing)

        // 验证缺失依赖被正确记录
        expect(data.missingDependencies.get('6')?.size).toBe(1)
        expect(data.missingDependencies.get('6')).toContain('7')
    })

    it('sync concrete entity with missing dependencies', () => {
        const {data, sync} = buildInheritInfo(abstractMap, concreteMap)

        // 同步一个有缺失依赖的具体实体
        const newItemWithMissing = {id: '8', extendsIds: ['9']} // 依赖不存在的 '9'
        sync.syncConcrete(newItemWithMissing)

        // 验证缺失依赖被正确记录
        expect(data.missingDependencies.get('8')?.size).toBe(1)
        expect(data.missingDependencies.get('8')).toContain('9')
    })

    it('remove abstract entity with missing dependencies', () => {
        // 创建包含缺失依赖的测试数据
        const abstractMapWithMissing: DeepReadonly<Map<string, InheritItem>> = new Map([
            ['1', {id: '1', extendsIds: []}],
            ['2', {id: '2', extendsIds: ['1', '3']}], // 依赖不存在的 '3'
        ])
        const concreteMapWithMissing: DeepReadonly<Map<string, InheritItem>> = new Map([
            ['4', {id: '4', extendsIds: ['1']}],
            ['5', {id: '5', extendsIds: ['2']}],
        ])

        const {data, sync} = buildInheritInfo(abstractMapWithMissing, concreteMapWithMissing)

        expect(data.missingDependencies.size).toBe(1)
        expect(data.missingDependencies.get('2')?.size).toBe(1)
        expect(data.missingDependencies.get('2')).toContain('3')

        // 移除抽象实体
        sync.removeAbstract('1')

        expect(data.missingDependencies.size).toBe(2)
        expect(data.missingDependencies.get('2')?.size).toBe(2)
        expect(data.missingDependencies.get('2')).toContain('1')
        expect(data.missingDependencies.get('2')).toContain('3')
        expect(data.missingDependencies.get('4')?.size).toBe(1)
        expect(data.missingDependencies.get('4')).toContain('1')

        // 恢复抽象实体
        sync.syncAbstract({id: '1', extendsIds: []})

        expect(data.missingDependencies.size).toBe(1)
        expect(data.missingDependencies.get('2')?.size).toBe(1)
        expect(data.missingDependencies.get('2')).toContain('3')
    })

    it('remove concrete entity with missing dependencies', () => {
        // 创建包含缺失依赖的测试数据
        const abstractMapNormal: DeepReadonly<Map<string, InheritItem>> = new Map([
            ['1', {id: '1', extendsIds: []}]
        ])
        const concreteMapWithMissing: DeepReadonly<Map<string, InheritItem>> = new Map([
            ['2', {id: '2', extendsIds: ['1', '3']}], // 依赖不存在的 '3'
        ])

        const {data, sync} = buildInheritInfo(abstractMapNormal, concreteMapWithMissing)

        expect(data.missingDependencies.size).toBe(1)
        expect(data.missingDependencies.get('2')?.size).toBe(1)
        expect(data.missingDependencies.get('2')).toContain('3')

        sync.syncConcrete({id: '2', extendsIds: []})

        expect(data.missingDependencies.size).toBe(0)

        sync.removeConcrete('2')

        expect(data.missingDependencies.size).toBe(0)

        sync.syncConcrete({id: '2', extendsIds: ['1', '3']})

        expect(data.missingDependencies.size).toBe(1)
        expect(data.missingDependencies.get('2')?.size).toBe(1)
        expect(data.missingDependencies.get('2')).toContain('3')
    })

    // 包含循环引用的测试数据
    const abstractMapWithCircular: DeepReadonly<Map<string, InheritItem>> = new Map([
        ['1', {id: '1', extendsIds: ['2']}], // 1 继承 2
        ['2', {id: '2', extendsIds: ['1']}], // 2 继承 1，形成循环
        ['3', {id: '3', extendsIds: ['3']}]  // 自循环引用
    ])
    const concreteMapWithCircular: DeepReadonly<Map<string, InheritItem>> = new Map([
        ['4', {id: '4', extendsIds: ['1']}],
        ['5', {id: '5', extendsIds: ['3']}]
    ])

    it('circular references', () => {
        const {data} = buildInheritInfo(abstractMapWithCircular, concreteMapWithCircular)

        // 验证循环引用被正确检测和记录
        expect(data.circularReferences.size).toBe(5)
        expect(data.circularReferences.get('1')?.length).toBe(1)
        expect(data.circularReferences.get('1')?.[0]).toEqual(['2', '1'])

        expect(data.circularReferences.get('2')?.length).toBe(1)
        expect(data.circularReferences.get('2')?.[0]).toEqual(['1', '2'])

        expect(data.circularReferences.get('3')?.length).toBe(1)
        expect(data.circularReferences.get('3')?.[0]?.length).toBe(1)
        expect(data.circularReferences.get('3')?.[0]?.[0]).toEqual('3')

        expect(data.circularReferences.get('4')?.length).toBe(1)
        expect(data.circularReferences.get('4')?.[0]?.length).toBe(2)
        expect(data.circularReferences.get('4')?.[0]).toEqual(['1', '2'])

        expect(data.circularReferences.get('5')?.length).toBe(1)
        expect(data.circularReferences.get('5')?.[0]?.length).toBe(1)
        expect(data.circularReferences.get('5')?.[0]?.[0]).toEqual('3')

        expect(data.missingDependencies.size).toBe(0)
    })

    it('sync abstract entity with circular references', () => {
        const {data, sync} = buildInheritInfo(abstractMapWithCircular, concreteMapWithCircular);

        // 同步一个新的抽象实体，该实体导致循环引用
        const newItem = {id: '6', extendsIds: ['6']}; // 自身循环引用
        sync.syncAbstract(newItem);
        const newSubItem = {id: '7', extendsIds: ['6']};
        sync.syncConcrete(newSubItem);

        // 验证循环引用被正确记录
        expect(data.circularReferences.has('6')).toBeTruthy();
        expect(data.circularReferences.get('6')?.length).toBe(1);
        expect(data.circularReferences.get('6')?.[0]).toEqual(['6']);

        expect(data.circularReferences.has('7')).toBeTruthy();
        expect(data.circularReferences.get('7')?.length).toBe(1);
        expect(data.circularReferences.get('7')?.[0]).toEqual(['6']);

        const existedItem1 = {id: '6', extendsIds: ['1', '6']}; // 有另一个外部循环引用和之前的自身循环引用
        sync.syncAbstract(existedItem1);

        expect(data.circularReferences.has('6')).toBeTruthy();
        expect(data.circularReferences.get('6')?.length).toBe(2);
        expect(data.circularReferences.get('6')?.[0]).toEqual(['1', '2']);
        expect(data.circularReferences.get('6')?.[1]).toEqual(['6']);

        expect(data.circularReferences.has('7')).toBeTruthy();
        expect(data.circularReferences.get('7')?.length).toBe(1);
        expect(data.circularReferences.get('7')?.[0]).toEqual(['6', '1', '2']);

        const existedItem2 = {id: '6', extendsIds: ['1']}; // 更新为仅有外部循环引用
        sync.syncAbstract(existedItem2);

        expect(data.circularReferences.has('6')).toBeTruthy();
        expect(data.circularReferences.get('6')?.length).toBe(1);
        expect(data.circularReferences.get('6')?.[0]).toEqual(['1', '2']);

        expect(data.circularReferences.has('7')).toBeTruthy();
        expect(data.circularReferences.get('7')?.length).toBe(1);
        expect(data.circularReferences.get('7')?.[0]).toEqual(['6', '1', '2']);
    });

    it('sync concrete entity with circular references', () => {
        const {data, sync} = buildInheritInfo(abstractMapWithCircular, concreteMapWithCircular);

        // 同步一个新的具体实体，该实体导致循环引用
        const newItem = {id: '6', extendsIds: ['1']}; // 指向已存在的循环引用链
        sync.syncConcrete(newItem);

        // 验证循环引用被正确记录
        expect(data.circularReferences.has('6')).toBeTruthy();
        expect(data.circularReferences.get('6')?.length).toBe(1);
        expect(data.circularReferences.get('6')?.[0]).toEqual(['1', '2']);

        // 同步一个存在的具体实体，该实体导致循环引用
        const existedItem1 = {id: '6', extendsIds: ['1', '3']}; // 更新循环引用
        sync.syncConcrete(existedItem1);
        expect(data.circularReferences.has('6')).toBeTruthy();
        expect(data.circularReferences.get('6')?.length).toBe(2);
        expect(data.circularReferences.get('6')?.[0]).toEqual(['1', '2']);
        expect(data.circularReferences.get('6')?.[1]).toEqual(['3']);

        const existedItem2 = {id: '6', extendsIds: ['3']}; // 更新循环引用
        sync.syncConcrete(existedItem2);
        expect(data.circularReferences.has('6')).toBeTruthy();
        expect(data.circularReferences.get('6')?.length).toBe(1);
        expect(data.circularReferences.get('6')?.[0]).toEqual(['3']);
    });

    it('remove abstract entity with circular references', () => {
        const {data, sync} = buildInheritInfo(abstractMapWithCircular, concreteMapWithCircular);

        // 确保循环引用存在
        expect(data.circularReferences.size).toBe(5);
        expect(data.circularReferences.has('1')).toBeTruthy();
        expect(data.circularReferences.has('2')).toBeTruthy();

        // 移除参与循环引用的抽象实体
        sync.removeAbstract('1');

        // 验证相关循环引用记录被清除
        expect(data.abstractInheritInfoMap.has('1')).toBeFalsy();
        expect(data.circularReferences.has('1')).toBeFalsy();

        // 子级循环引用记录也被更新
        expect(data.circularReferences.size).toBe(2);
        expect(data.circularReferences.has('3')).toBeTruthy();
        expect(data.circularReferences.has('5')).toBeTruthy();
    });

    it('remove concrete entity with circular references', () => {
        const {data, sync} = buildInheritInfo(abstractMapWithCircular, concreteMapWithCircular);

        // 确保循环引用存在
        expect(data.circularReferences.size).toBe(5);
        expect(data.circularReferences.has('4')).toBeTruthy();
        expect(data.circularReferences.has('5')).toBeTruthy();

        // 移除参与循环引用的具体实体
        sync.removeConcrete('4');

        // 验证具体实体被移除且相关循环引用记录被清除
        expect(data.concreteInheritInfoMap.has('4')).toBeFalsy();
        expect(data.circularReferences.has('4')).toBeFalsy();

        // 其他实体的循环引用记录应该仍然存在
        expect(data.circularReferences.size).toBe(4);
    });

})
