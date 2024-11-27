import {DeepReadonly} from "vue";
import {cloneDeep} from "lodash";

export const cloneDeepReadonly = <T> (value: DeepReadonly<T>): T => {
    return cloneDeep(value) as T
}