export type TreeNode<T> = {
    id: string
    data: T
    children?: TreeNode<T>[]
    disabled?: boolean
}
