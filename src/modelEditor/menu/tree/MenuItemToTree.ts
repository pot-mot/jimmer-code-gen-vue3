import type {TreeNode} from "@/components/tree/TreeNode.ts";
import type {MenuItem} from "@/modelEditor/useModelEditor.ts";

export type MenuItemTreeNode = TreeNode<{
    type: "Group",
    group: Group,
} | {
    type: "MappedSuperClass",
    mappedSuperClass: MappedSuperClassWithProperties,
} | {
    type: "Entity",
    entity: EntityWithProperties,
} | {
    type: "Enumeration",
    enumeration: Enumeration,
} | {
    type: "EmbeddableType",
    embeddableType: EmbeddableTypeWithProperties,
} | {
    type: "Association",
    association: Association,
}>

const entityToTreeNode = (entity: EntityWithProperties): MenuItemTreeNode => {
    return {
        id: entity.id,
        data: {
            type: "Entity",
            entity,
        },
    }
}
const mappedSuperClassToTreeNode = (mappedSuperClass: MappedSuperClassWithProperties): MenuItemTreeNode => {
    return {
        id: mappedSuperClass.id,
        data: {
            type: "MappedSuperClass",
            mappedSuperClass,
        },
    }
}
const enumerationToTreeNode = (enumeration: Enumeration): MenuItemTreeNode => {
    return {
        id: enumeration.id,
        data: {
            type: "Enumeration",
            enumeration,
        },
    }
}
const embeddableToTreeNode = (embeddableType: EmbeddableTypeWithProperties): MenuItemTreeNode => {
    return {
        id: embeddableType.id,
        data: {
            type: "EmbeddableType",
            embeddableType,
        },
    }
}

export const menuItemToTree = (
    menuItem: MenuItem,
    filter: (item: {
        name: string,
        comment: string,
    }) => boolean
): MenuItemTreeNode => {
    return {
        id: menuItem.group.id,
        data: {
            type: "Group",
            group: menuItem.group,
        },
        children: [
            ...menuItem.orderedMappedSuperClasses.filter(filter).map(mappedSuperClassToTreeNode),
            ...menuItem.orderedEntities.filter(filter).map(entityToTreeNode),
            ...menuItem.orderedEnumerations.filter(filter).map(enumerationToTreeNode),
            ...menuItem.orderedEmbeddableTypes.filter(filter).map(embeddableToTreeNode),
        ]
    }
}