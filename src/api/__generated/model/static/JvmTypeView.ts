export interface JvmTypeView {
    id: string;
    typeExpression: string;
    serialized: boolean;
    extraImports: Array<string>;
    extraAnnotations: Array<string>;
}
