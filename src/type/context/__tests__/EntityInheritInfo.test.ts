import {describe, it, expect} from 'vitest'
import {buildInheritInfo, type InheritItem} from "@/type/context/utils/EntityInheritInfo";

describe('EntityInheritInfo', () => {
    // 创建测试数据
    const abstractMap: DeepReadonly<Map<string, InheritItem>> = new Map([
        ['Animal', {id: 'Animal', extendsIds: []}],
        ['Mammal', {id: 'Mammal', extendsIds: ['Animal']}],
        ['Bird', {id: 'Bird', extendsIds: ['Animal']}],
        ['Canine', {id: 'Canine', extendsIds: ['Mammal']}]
    ])

    const concreteMap: DeepReadonly<Map<string, InheritItem>> = new Map([
        ['Dog', {id: 'Dog', extendsIds: ['Canine']}],
        ['Cat', {id: 'Cat', extendsIds: ['Mammal']}],
        ['Eagle', {id: 'Eagle', extendsIds: ['Bird']}],
        ['Dove', {id: 'Dove', extendsIds: ['Bird']}]
    ])

    it('build inherit info correctly', () => {
        const inheritInfo = buildInheritInfo(abstractMap, concreteMap)

        // 验证抽象实体继承信息
        const animalInfo = inheritInfo.abstractInheritInfoMap.get('Animal')
        expect(animalInfo).toBeDefined()
        expect(animalInfo?.parentIdSet.size).toBe(0)
        expect(animalInfo?.ancestorIdSet.size).toBe(0)
        expect(animalInfo?.abstractChildIdSet).toContain('Mammal')
        expect(animalInfo?.abstractChildIdSet).toContain('Bird')
        expect(animalInfo?.concreteChildIdSet.size).toBe(0)
        expect(animalInfo?.allAbstractChildIdSet).toContain('Mammal')
        expect(animalInfo?.allAbstractChildIdSet).toContain('Bird')
        expect(animalInfo?.allAbstractChildIdSet).toContain('Canine')
        expect(animalInfo?.allConcreteChildIdSet).toContain('Dog')
        expect(animalInfo?.allConcreteChildIdSet).toContain('Cat')
        expect(animalInfo?.allConcreteChildIdSet).toContain('Eagle')
        expect(animalInfo?.allConcreteChildIdSet).toContain('Dove')

        // 验证具体实体继承信息
        const dogInfo = inheritInfo.concreteInheritInfoMap.get('Dog')
        expect(dogInfo).toBeDefined()
        expect(dogInfo?.parentIdSet).toContain('Canine')
        expect(dogInfo?.ancestorIdSet).toContain('Canine')
        expect(dogInfo?.ancestorIdSet).toContain('Mammal')
        expect(dogInfo?.ancestorIdSet).toContain('Animal')
    })

    it('sync abstract entity correctly', () => {
        const inheritInfo = buildInheritInfo(abstractMap, concreteMap)

        // 添加新的抽象实体
        const newAbstractItem = {id: 'Reptile', extendsIds: ['Animal']}
        inheritInfo.syncAbstract(newAbstractItem)

        const animalInfo = inheritInfo.abstractInheritInfoMap.get('Animal')
        expect(animalInfo?.abstractChildIdSet).toContain('Reptile')
    })

    it('sync concrete entity correctly', () => {
        const inheritInfo = buildInheritInfo(abstractMap, concreteMap)

        const newAbstractItem = {id: 'Reptile', extendsIds: ['Animal']}
        inheritInfo.syncAbstract(newAbstractItem)
        const newConcreteItem = {id: 'Snake', extendsIds: ['Reptile']}
        inheritInfo.syncConcrete(newConcreteItem)

        const snakeInfo = inheritInfo.concreteInheritInfoMap.get('Snake')
        expect(snakeInfo).toBeDefined()
        expect(snakeInfo?.parentIdSet).toContain('Reptile')
        const reptileInfo = inheritInfo.abstractInheritInfoMap.get('Reptile')
        expect(reptileInfo?.concreteChildIdSet).toContain('Snake')
        expect(reptileInfo?.allConcreteChildIdSet).toContain('Snake')
    })

    it('remove abstract entity correctly', () => {
        const inheritInfo = buildInheritInfo(abstractMap, concreteMap)

        inheritInfo.removeAbstract('Bird')

        const animalInfo = inheritInfo.abstractInheritInfoMap.get('Animal')
        expect(animalInfo?.abstractChildIdSet).not.toContain('Bird')
        expect(animalInfo?.allConcreteChildIdSet).not.toContain('Eagle')
        expect(animalInfo?.allConcreteChildIdSet).not.toContain('Dove')
    })

    it('remove concrete entity correctly', () => {
        const inheritInfo = buildInheritInfo(abstractMap, concreteMap)

        inheritInfo.removeConcrete('Cat')

        const mammalInfo = inheritInfo.abstractInheritInfoMap.get('Mammal')
        expect(mammalInfo?.concreteChildIdSet).not.toContain('Cat')
        expect(mammalInfo?.allConcreteChildIdSet).not.toContain('Cat')
        const animalInfo = inheritInfo.abstractInheritInfoMap.get('Animal')
        expect(animalInfo?.concreteChildIdSet).not.toContain('Cat')
        expect(animalInfo?.allConcreteChildIdSet).not.toContain('Cat')
    })
})
