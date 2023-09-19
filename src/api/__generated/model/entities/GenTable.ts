import type {TableType} from '../enums';
import type {GenColumn, GenEntity, GenSchema, GenTableGroup} from './';

export interface GenTable {

    createdTime: string;

    modifiedTime: string;

    remark: string;

    id: number;

    schemaId: number;

    schema: GenSchema;

    groupId?: number;

    group?: GenTableGroup;

    entityIds: number[];

    entities: GenEntity[];

    name: string;

    comment: string;

    type: TableType;

    orderKey: number;

    columnIds: number[];

    columns: GenColumn[];
}
