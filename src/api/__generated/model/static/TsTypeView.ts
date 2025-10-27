import type {TsImport} from './';

export interface TsTypeView {
    id: string;
    typeExpression: string;
    extraImports: Array<TsImport>;
}
