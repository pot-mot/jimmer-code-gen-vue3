import {cloneDeep} from "lodash-es";
import {toRaw} from "vue";

export const cloneDeepReadonly = <T> (value: DeepReadonly<T> | T): T => {
    return cloneDeep(value) as T
}

export const cloneDeepReadonlyRaw = <T> (value: DeepReadonly<T> | T): T => {
    return cloneDeep(toRaw(value)) as T
}
