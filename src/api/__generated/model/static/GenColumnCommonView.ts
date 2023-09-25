export interface GenColumnCommonView {

    autoIncrement: boolean;

    comment: string;

    createdTime: string;

    defaultValue?: string;

    displaySize: number;

    fk: boolean;

    id: number;

    modifiedTime: string;

    name: string;

    notNull: boolean;

    numericPrecision: number;

    orderKey: number;

    pk: boolean;

    remark: string;

    tableId?: number;

    type: string;

    typeCode: number;

    unique: boolean;
}
