export interface SqlTypeView {
    id: string;
    type: string;
    dataSize?: number | undefined;
    numericPrecision?: number | undefined;
    defaultValue?: string | undefined;
}
