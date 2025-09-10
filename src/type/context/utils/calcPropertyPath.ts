// TODO 完成属性路径解析
// export type PropertyPath = {
//     entityId: string,
//     propertyId: string
// }[]
//
// export const calcPropertyPath = (
//     entityId: string,
//     propertyPath: string[],
//     context: ModelContext,
// ): PropertyPath => {
//     const allProperties = context.entityAllPropertiesMap.get(entityId)
//     if (!allProperties) {
//         throw new Error(`Entity [${entityId}] doesn't hava allProperties Data`)
//     }
//
//     if (propertyPath.length <= 1) {
//         throw new Error(`dependencePropertyIds [${propertyPath}] of FormulaProperty [${property.id}] is invalid`);
//     }
//
//     // 验证数组中的属性ID序列是否有效
//     let currentEntityProperties = allProperties
//
//     // 遍历除最后一个元素外的所有元素，它们都应该是ToOne关联属性
//     for (let i = 0; i < propertyPath.length - 1; i++) {
//         const associationPropertyId = propertyPath[i];
//         const associationProperty = currentEntityProperties.associationPropertyMap.find(it => it.id === associationPropertyId);
//
//         // 检查是否是ToOne关联属性
//         if (!associationProperty ||
//             (associationProperty.category !== "ASSOCIATION_OneToOne_Source" &&
//                 associationProperty.category !== "ASSOCIATION_OneToOne_Target" &&
//                 associationProperty.category !== "ASSOCIATION_ManyToOne")) {
//             legal = false;
//             missingDependencies.push({
//                 path: ['dependencePropertyIds'],
//                 ids: {propertyIds: [{entityId, id: associationPropertyId}]}
//             });
//             break;
//         }
//
//         // 获取下一个实体的属性信息
//         const nextEntityId = associationProperty.referenceEntityId;
//         const nextEntityProperties = context.entityAllPropertiesMap.get(nextEntityId);
//         if (!nextEntityProperties) {
//             legal = false;
//             missingDependencies.push({
//                 path: ['dependencePropertyIds'],
//                 ids: {entityIds: [nextEntityId]}
//             });
//             break;
//         }
//
//         currentEntityProperties = nextEntityProperties;
//     }
//
//     // 验证最后一个元素是否是标量属性
//     if (legal) {
//         const lastPropertyId = propertyPath[propertyPath.length - 1];
//         const scalarProperty = currentEntityProperties.scalarPropertyMap.find(it => it.id === lastPropertyId);
//
//         if (!scalarProperty) {
//             missingDependencies.push({
//                 path: ['dependencePropertyIds'],
//                 ids: {propertyIds: [{entityId: currentEntityProperties.id, id: lastPropertyId}]}
//             });
//         }
//     }
// }