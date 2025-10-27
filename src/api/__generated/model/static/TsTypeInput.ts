import type {TsImport} from './';

export interface TsTypeInput {
    id?: string | undefined;
    typeExpression: string;
    extraImports: Array<TsImport>;
}
