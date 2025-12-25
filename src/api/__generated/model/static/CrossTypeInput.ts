export interface CrossTypeInput {
    id?: string | undefined;
    nullable?: boolean | undefined;
    sqlTypeId: string;
    jvmTypeId: string;
    tsTypeId: string;
}
