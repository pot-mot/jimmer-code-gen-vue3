export type CollapseDetailProps = {
    openTrigger?: 'head' | 'caret' | undefined,
    triggerPosition?: 'left' | 'right' | undefined,
    transitionDuration?: number | undefined,
}

export const defaultCollapseDetailProps: CollapseDetailProps = {
    openTrigger: 'caret',
    triggerPosition: 'right',
    transitionDuration: 300,
}