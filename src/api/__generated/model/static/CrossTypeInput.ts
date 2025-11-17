export interface CrossTypeInput {
    id?: string | undefined;
    nullable: boolean;
    sqlTypeId: string;
    jvmTypeId: string;
    tsTypeId: string;
}
