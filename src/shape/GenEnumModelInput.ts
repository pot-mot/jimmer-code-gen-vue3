import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {
    GenModelInput_TargetOf_enums,
    GenModelInput_TargetOf_enums_TargetOf_items
} from "@/api/__generated/model/static";
import {DeepReadonly} from "vue";
import {GenModelInputJsonSchema} from "@/shape/ModelInput.ts";

export const {validate: validateEnumModelInput} =
    useShapeValidate<DeepReadonly<GenModelInput_TargetOf_enums>>(
        GenModelInputJsonSchema,
        "GenModelInput_TargetOf_enums",
    )

export const {validate: validateEnumItemModelInput} =
    useShapeValidate<DeepReadonly<GenModelInput_TargetOf_enums_TargetOf_items>>(
        GenModelInputJsonSchema,
        "GenModelInput_TargetOf_enums_TargetOf_items",
    )
