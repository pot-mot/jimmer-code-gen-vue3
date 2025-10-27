export const ScriptType_CONSTANTS = [
    'AssociationGenerator', 
    'EmbeddableTypeGenerator', 
    'EntityGenerator', 
    'EnumerationGenerator', 
    'GroupGenerator', 
    'MappedSuperClassGenerator', 
    'ModelGenerator', 
    'TableDiffGenerator', 
    'TableGenerator'
] as const;
export type ScriptType = typeof ScriptType_CONSTANTS[number];
