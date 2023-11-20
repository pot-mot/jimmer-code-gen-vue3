import {AssociationMatchType, AssociationType, DataSourceType, GenLanguage} from "@/api/__generated/model/enums";

export const associationTypes: ReadonlyArray<AssociationType> = [
    'ONE_TO_ONE',
    'MANY_TO_ONE',
    'ONE_TO_MANY',
    'MANY_TO_MANY'
]

export const associationMatchTypes: ReadonlyArray<AssociationMatchType> = [
    'SIMPLE_PK',
    'INCLUDE_TABLE_NAME',
    'PK_SUFFIX'
]

export const dataSourceTypes: ReadonlyArray<DataSourceType> = [
    'MySQL',
    'PostgreSQL'
]

export const languages: ReadonlyArray<GenLanguage> = [
    'KOTLIN',
    'JAVA'
]