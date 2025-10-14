import {describe, it, expect} from 'vitest'
import {buildInheritInfo, type InheritItem} from "@/type/context/utils/InheritInfos.ts";

describe('EntityInheritInfo', () => {
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
        const inheritInfo = buildInheritInfo(abstractMap, concreteMap)

        // 验证抽象实体继承信息
        const rootInfo = inheritInfo.abstractInheritInfoMap.get('1')
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
        const concreteInfo = inheritInfo.concreteInheritInfoMap.get('1-1-1-1')
        expect(concreteInfo).toBeDefined()
        expect(concreteInfo?.parentIdSet).toContain('1-1-1')
        expect(concreteInfo?.ancestorIdSet).toContain('1-1-1')
        expect(concreteInfo?.ancestorIdSet).toContain('1-1')
        expect(concreteInfo?.ancestorIdSet).toContain('1')
    })

    it('sync abstract entity', () => {
        const inheritInfo = buildInheritInfo(abstractMap, concreteMap)

        // 添加新的抽象实体
        const newAbstractItem = {id: '1-3', extendsIds: ['1']}
        inheritInfo.syncAbstract(newAbstractItem)

        const rootInfo = inheritInfo.abstractInheritInfoMap.get('1')
        expect(rootInfo?.abstractChildIdSet).toContain('1-3')
    })

    it('sync concrete entity', () => {
        const inheritInfo = buildInheritInfo(abstractMap, concreteMap)

        const newAbstractItem = {id: '1-3', extendsIds: ['1']}
        inheritInfo.syncAbstract(newAbstractItem)
        const newConcreteItem = {id: '1-3-1', extendsIds: ['1-3']}
        inheritInfo.syncConcrete(newConcreteItem)

        const concreteInfo = inheritInfo.concreteInheritInfoMap.get('1-3-1')
        expect(concreteInfo).toBeDefined()
        expect(concreteInfo?.parentIdSet).toContain('1-3')
        const abstractInfo = inheritInfo.abstractInheritInfoMap.get('1-3')
        expect(abstractInfo?.concreteChildIdSet).toContain('1-3-1')
        expect(abstractInfo?.allConcreteChildIdSet).toContain('1-3-1')
    })

    it('remove abstract entity', () => {
        const inheritInfo = buildInheritInfo(abstractMap, concreteMap)

        inheritInfo.removeAbstract('1-2')

        expect(inheritInfo.abstractInheritInfoMap.size).toBe(3)
        expect(inheritInfo.abstractInheritInfoMap.has('1')).toBeTruthy()
        expect(inheritInfo.abstractInheritInfoMap.has('1-1')).toBeTruthy()
        expect(inheritInfo.abstractInheritInfoMap.has('1-1-1')).toBeTruthy()

        for (const childInfo of inheritInfo.abstractInheritInfoMap.values()) {
            expect(childInfo.parentIdSet).not.toContain('1-2')
            expect(childInfo.ancestorIdSet).not.toContain('1-2')
            expect(childInfo.abstractChildIdSet).not.toContain('1-2')
            expect(childInfo.allAbstractChildIdSet).not.toContain('1-2')
        }

        expect(inheritInfo.concreteInheritInfoMap.size).toBe(4)
        expect(inheritInfo.concreteInheritInfoMap.has('1-1-1-1')).toBeTruthy()
        expect(inheritInfo.concreteInheritInfoMap.has('1-1-2')).toBeTruthy()
        expect(inheritInfo.concreteInheritInfoMap.has('1-2-1')).toBeTruthy()
        expect(inheritInfo.concreteInheritInfoMap.has('1-2-2')).toBeTruthy()

        for (const childInfo of inheritInfo.concreteInheritInfoMap.values()) {
            expect(childInfo.parentIdSet).not.toContain('1-2')
            expect(childInfo.ancestorIdSet).not.toContain('1-2')
        }
    })

    it('remove concrete entity', () => {
        const inheritInfo = buildInheritInfo(abstractMap, concreteMap)

        inheritInfo.removeConcrete('1-1-2')

        const childInfo = inheritInfo.abstractInheritInfoMap.get('1-1')
        expect(childInfo?.concreteChildIdSet).not.toContain('1-1-2')
        expect(childInfo?.allConcreteChildIdSet).not.toContain('1-1-2')
        const rootInfo = inheritInfo.abstractInheritInfoMap.get('1')
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

        const inheritInfo = buildInheritInfo(abstractMapWithMissing, concreteMapWithMissing)

        // 验证缺失依赖被正确记录
        expect(inheritInfo.missingDependencies.size).toBe(2)

        expect(inheritInfo.missingDependencies.get('2')?.size).toBe(2)
        expect(inheritInfo.missingDependencies.get('2')).toContain('3')
        expect(inheritInfo.missingDependencies.get('2')).toContain('4')

        expect(inheritInfo.missingDependencies.get('4')?.size).toBe(2)
        expect(inheritInfo.missingDependencies.get('4')).toContain('5')
        expect(inheritInfo.missingDependencies.get('4')).toContain('6')
    })

    it('sync abstract entity with missing dependencies', () => {
        const inheritInfo = buildInheritInfo(abstractMap, concreteMap)

        // 同步一个有缺失依赖的抽象实体
        const newItemWithMissing = {id: '6', extendsIds: ['7']} // 依赖不存在的 '7'
        inheritInfo.syncAbstract(newItemWithMissing)

        // 验证缺失依赖被正确记录
        expect(inheritInfo.missingDependencies.get('6')?.size).toBe(1)
        expect(inheritInfo.missingDependencies.get('6')).toContain('7')
    })

    it('sync concrete entity with missing dependencies', () => {
        const inheritInfo = buildInheritInfo(abstractMap, concreteMap)

        // 同步一个有缺失依赖的具体实体
        const newItemWithMissing = {id: '8', extendsIds: ['9']} // 依赖不存在的 '9'
        inheritInfo.syncConcrete(newItemWithMissing)

        // 验证缺失依赖被正确记录
        expect(inheritInfo.missingDependencies.get('8')?.size).toBe(1)
        expect(inheritInfo.missingDependencies.get('8')).toContain('9')
    })

    // 创建包含缺失依赖和循环引用的测试数据
    const abstractMapWithMissing: DeepReadonly<Map<string, InheritItem>> = new Map([
        ['1', {id: '1', extendsIds: []}],
        ['2', {id: '2', extendsIds: ['1', '3']}], // 依赖不存在的 '3'
        ['4', {id: '4', extendsIds: ['5']}]       // 依赖不存在的 '5'
    ])
    const concreteMapWithMissing: DeepReadonly<Map<string, InheritItem>> = new Map([
        ['6', {id: '6', extendsIds: ['2', '7']}] // 依赖不存在的 '7'
    ])

    it('remove abstract entity should clean up dependencies and references', () => {
        const inheritInfo = buildInheritInfo(abstractMapWithMissing, concreteMapWithMissing)

        // 确保初始状态包含缺失依赖
        expect(inheritInfo.missingDependencies.size).toBe(3)
        expect(inheritInfo.missingDependencies.get('2')?.size).toBe(1)
        expect(inheritInfo.missingDependencies.get('2')).toContain('3')
        expect(inheritInfo.missingDependencies.get('4')?.size).toBe(1)
        expect(inheritInfo.missingDependencies.get('4')).toContain('5')
        expect(inheritInfo.missingDependencies.get('6')?.size).toBe(1)
        expect(inheritInfo.missingDependencies.get('6')).toContain('7')
        expect(inheritInfo.abstractInheritInfoMap.get('2')?.parentIdSet.size).toBe(1)
        expect(inheritInfo.abstractInheritInfoMap.get('2')?.parentIdSet).toContain('1')
        expect(inheritInfo.abstractInheritInfoMap.get('4')?.parentIdSet.size).toBe(0)
        expect(inheritInfo.abstractInheritInfoMap.get('4')?.ancestorIdSet.size).toBe(0)
        expect(inheritInfo.concreteInheritInfoMap.get('6')?.parentIdSet.size).toBe(1)
        expect(inheritInfo.concreteInheritInfoMap.get('6')?.parentIdSet).toContain('2')
        expect(inheritInfo.concreteInheritInfoMap.get('6')?.ancestorIdSet.size).toBe(2)
        expect(inheritInfo.concreteInheritInfoMap.get('6')?.ancestorIdSet).toContain('1')
        expect(inheritInfo.concreteInheritInfoMap.get('6')?.ancestorIdSet).toContain('2')

        // 移除抽象实体
        inheritInfo.removeAbstract('2')

        expect(inheritInfo.missingDependencies.size).toBe(2)
        expect(inheritInfo.missingDependencies.get('4')?.size).toBe(1)
        expect(inheritInfo.missingDependencies.get('6')?.size).toBe(1)
        expect(inheritInfo.missingDependencies).not.toContain('2')
        expect(inheritInfo.concreteInheritInfoMap.get('6')?.parentIdSet.size).toBe(0)
        expect(inheritInfo.concreteInheritInfoMap.get('6')?.ancestorIdSet.size).toBe(0)
    })

    it('remove concrete entity should clean up dependencies', () => {
        // 创建包含缺失依赖的测试数据
        const abstractMapNormal: DeepReadonly<Map<string, InheritItem>> = new Map([
            ['1', {id: '1', extendsIds: []}]
        ])

        const concreteMapWithMissing: DeepReadonly<Map<string, InheritItem>> = new Map([
            ['2', {id: '2', extendsIds: ['3']}], // 依赖不存在的 '3'
            ['4', {id: '4', extendsIds: ['5']}]  // 依赖不存在的 '5'
        ])

        const inheritInfo = buildInheritInfo(abstractMapNormal, concreteMapWithMissing)

        // 确保初始状态包含缺失依赖
        expect(inheritInfo.missingDependencies.size).toBeGreaterThan(0)

        // 移除具体实体
        inheritInfo.removeConcrete('2')

        // 验证相关的数据结构被正确清理
        expect(inheritInfo.concreteInheritInfoMap.has('2')).toBeFalsy()
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
        const inheritInfo = buildInheritInfo(abstractMapWithCircular, concreteMapWithCircular)

        // 验证循环引用被正确检测和记录
        expect(inheritInfo.circularReferences.size).toBe(5)
        expect(inheritInfo.circularReferences.get('1')?.length).toBe(1)
        expect(inheritInfo.circularReferences.get('1')?.[0]).toEqual(['2', '1'])

        expect(inheritInfo.circularReferences.get('2')?.length).toBe(1)
        expect(inheritInfo.circularReferences.get('2')?.[0]).toEqual(['1', '2'])

        expect(inheritInfo.circularReferences.get('3')?.length).toBe(1)
        expect(inheritInfo.circularReferences.get('3')?.[0]?.length).toBe(1)
        expect(inheritInfo.circularReferences.get('3')?.[0]?.[0]).toEqual('3')

        expect(inheritInfo.circularReferences.get('4')?.length).toBe(1)
        expect(inheritInfo.circularReferences.get('4')?.[0]?.length).toBe(2)
        expect(inheritInfo.circularReferences.get('4')?.[0]).toEqual(['1', '2'])

        expect(inheritInfo.circularReferences.get('5')?.length).toBe(1)
        expect(inheritInfo.circularReferences.get('5')?.[0]?.length).toBe(1)
        expect(inheritInfo.circularReferences.get('5')?.[0]?.[0]).toEqual('3')

        expect(inheritInfo.missingDependencies.size).toBe(0)
    })

    it('sync abstract entity with circular references', () => {
        const inheritInfo = buildInheritInfo(abstractMapWithCircular, concreteMapWithCircular);

        // 同步一个新的抽象实体，该实体导致循环引用
        const newItem = {id: '6', extendsIds: ['6']}; // 自身循环引用
        inheritInfo.syncAbstract(newItem);
        const newSubItem = {id: '7', extendsIds: ['6']};
        inheritInfo.syncConcrete(newSubItem);

        // 验证循环引用被正确记录
        expect(inheritInfo.circularReferences.has('6')).toBeTruthy();
        expect(inheritInfo.circularReferences.get('6')?.length).toBe(1);
        expect(inheritInfo.circularReferences.get('6')?.[0]).toEqual(['6']);

        expect(inheritInfo.circularReferences.has('7')).toBeTruthy();
        expect(inheritInfo.circularReferences.get('7')?.length).toBe(1);
        expect(inheritInfo.circularReferences.get('7')?.[0]).toEqual(['6']);

        const existedItem1 = {id: '6', extendsIds: ['1', '6']}; // 有另一个外部循环引用和之前的自身循环引用
        inheritInfo.syncAbstract(existedItem1);

        expect(inheritInfo.circularReferences.has('6')).toBeTruthy();
        expect(inheritInfo.circularReferences.get('6')?.length).toBe(2);
        expect(inheritInfo.circularReferences.get('6')?.[0]).toEqual(['1', '2']);
        expect(inheritInfo.circularReferences.get('6')?.[1]).toEqual(['6']);

        expect(inheritInfo.circularReferences.has('7')).toBeTruthy();
        expect(inheritInfo.circularReferences.get('7')?.length).toBe(1);
        expect(inheritInfo.circularReferences.get('7')?.[0]).toEqual(['6', '1', '2']);

        const existedItem2 = {id: '6', extendsIds: ['1']}; // 更新为仅有外部循环引用
        inheritInfo.syncAbstract(existedItem2);

        expect(inheritInfo.circularReferences.has('6')).toBeTruthy();
        expect(inheritInfo.circularReferences.get('6')?.length).toBe(1);
        expect(inheritInfo.circularReferences.get('6')?.[0]).toEqual(['1', '2']);

        expect(inheritInfo.circularReferences.has('7')).toBeTruthy();
        expect(inheritInfo.circularReferences.get('7')?.length).toBe(1);
        expect(inheritInfo.circularReferences.get('7')?.[0]).toEqual(['6', '1', '2']);
    });

    it('sync concrete entity with circular references', () => {
        const inheritInfo = buildInheritInfo(abstractMapWithCircular, concreteMapWithCircular);

        // 同步一个新的具体实体，该实体导致循环引用
        const newItem = {id: '6', extendsIds: ['1']}; // 指向已存在的循环引用链
        inheritInfo.syncConcrete(newItem);

        // 验证循环引用被正确记录
        expect(inheritInfo.circularReferences.has('6')).toBeTruthy();
        expect(inheritInfo.circularReferences.get('6')?.length).toBe(1);
        expect(inheritInfo.circularReferences.get('6')?.[0]).toEqual(['1', '2']);

        // 同步一个存在的具体实体，该实体导致循环引用
        const existedItem1 = {id: '6', extendsIds: ['1', '3']}; // 更新循环引用
        inheritInfo.syncConcrete(existedItem1);
        expect(inheritInfo.circularReferences.has('6')).toBeTruthy();
        expect(inheritInfo.circularReferences.get('6')?.length).toBe(2);
        expect(inheritInfo.circularReferences.get('6')?.[0]).toEqual(['1', '2']);
        expect(inheritInfo.circularReferences.get('6')?.[1]).toEqual(['3']);

        const existedItem2 = {id: '6', extendsIds: ['3']}; // 更新循环引用
        inheritInfo.syncConcrete(existedItem2);
        expect(inheritInfo.circularReferences.has('6')).toBeTruthy();
        expect(inheritInfo.circularReferences.get('6')?.length).toBe(1);
        expect(inheritInfo.circularReferences.get('6')?.[0]).toEqual(['3']);
    });

    it('remove abstract entity with circular references', () => {
        const inheritInfo = buildInheritInfo(abstractMapWithCircular, concreteMapWithCircular);

        // 确保循环引用存在
        expect(inheritInfo.circularReferences.size).toBe(5);
        expect(inheritInfo.circularReferences.has('1')).toBeTruthy();
        expect(inheritInfo.circularReferences.has('2')).toBeTruthy();

        // 移除参与循环引用的抽象实体
        inheritInfo.removeAbstract('1');

        // 验证相关循环引用记录被清除
        expect(inheritInfo.abstractInheritInfoMap.has('1')).toBeFalsy();
        expect(inheritInfo.circularReferences.has('1')).toBeFalsy();

        // 子级循环引用记录也被更新
        expect(inheritInfo.circularReferences.size).toBe(2);
        expect(inheritInfo.circularReferences.has('3')).toBeTruthy();
        expect(inheritInfo.circularReferences.has('5')).toBeTruthy();
    });

    it('remove concrete entity with circular references', () => {
        const inheritInfo = buildInheritInfo(abstractMapWithCircular, concreteMapWithCircular);

        // 确保循环引用存在
        expect(inheritInfo.circularReferences.size).toBe(5);
        expect(inheritInfo.circularReferences.has('4')).toBeTruthy();
        expect(inheritInfo.circularReferences.has('5')).toBeTruthy();

        // 移除参与循环引用的具体实体
        inheritInfo.removeConcrete('4');

        // 验证具体实体被移除且相关循环引用记录被清除
        expect(inheritInfo.concreteInheritInfoMap.has('4')).toBeFalsy();
        expect(inheritInfo.circularReferences.has('4')).toBeFalsy();

        // 其他实体的循环引用记录应该仍然存在
        expect(inheritInfo.circularReferences.size).toBe(4);
    });

})
