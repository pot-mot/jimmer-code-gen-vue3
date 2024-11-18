export interface FormEmits<SubmitType, CancelType = SubmitType> {
    (event: "submit", data: SubmitType): void

    (event: "cancel", data: CancelType): void
}
