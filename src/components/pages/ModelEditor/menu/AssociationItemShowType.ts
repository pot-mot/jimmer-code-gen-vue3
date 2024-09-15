export const AssociationItemShowType_CONSTANTS = ["NAME", "TABLE", "COLUMN"] as const

export type AssociationItemShowType = typeof AssociationItemShowType_CONSTANTS[number]