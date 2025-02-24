import {EntityConfigInput} from "@/api/__generated/model/static";

export type EntityFormExpose = {
    getInput(): EntityConfigInput,
    validate(): Promise<boolean>
}
