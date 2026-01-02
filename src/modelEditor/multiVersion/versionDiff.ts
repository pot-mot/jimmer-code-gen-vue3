import {getObjectDiff} from "@donedeal0/superdiff";

export const versionDiff = (
    prev: ModelGraphSubData | undefined,
    next: ModelGraphSubData | undefined
) => {
    return getObjectDiff(
        prev,
        next,
        {
            ignoreArrayOrder: false,
            showOnly: {
                statuses: [
                    "added", "deleted", "updated"
                ],
                granularity: 'deep'
            }
        }
    )
}