export interface JvmTypeInput {
    id?: string | undefined;
    typeExpression: string;
    serialized: boolean;
    extraImports: Array<string>;
    extraAnnotations: Array<string>;
}
