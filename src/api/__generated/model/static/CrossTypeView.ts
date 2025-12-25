export interface CrossTypeView {
    id: string;
    nullable?: boolean | undefined;
    sqlTypeId: string;
    jvmTypeId: string;
    tsTypeId: string;
}
