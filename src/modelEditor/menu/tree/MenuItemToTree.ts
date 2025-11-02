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
    association: AssociationIdOnly,
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

const getDataName = (item: MenuItemTreeNode): string => {
    switch (item.data.type) {
        case "Group":
            return item.data.group.name
        case "MappedSuperClass":
            return item.data.mappedSuperClass.name
        case "Entity":
            return item.data.entity.name
        case "Enumeration":
            return item.data.enumeration.name
        case "EmbeddableType":
            return item.data.embeddableType.name
        case "Association":
            return "name" in item.data.association ? item.data.association.name : item.data.association.nameTemplate
    }
}

export const menuItemToTree = (
    menuItem: MenuItem,
    filter: (item: {
        name: string,
        comment: string,
    }) => boolean = () => true
): MenuItemTreeNode => {
    return {
        id: menuItem.group.id,
        data: {
            type: "Group",
            group: menuItem.group,
        },
        children: [
            ...menuItem.mappedSuperClasses.filter(filter).map(mappedSuperClassToTreeNode),
            ...menuItem.entities.filter(filter).map(entityToTreeNode),
            ...menuItem.enumerations.filter(filter).map(enumerationToTreeNode),
            ...menuItem.embeddableTypes.filter(filter).map(embeddableToTreeNode),
        ].sort((a, b) => getDataName(a).localeCompare(getDataName(b)))
    }
}