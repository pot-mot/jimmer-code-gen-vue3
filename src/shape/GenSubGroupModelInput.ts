import {useShapeValidate} from "@/shape/shapeValidate.ts";
import {DeepReadonly} from "vue";
import {GenModelInput_TargetOf_subGroups} from "@/api/__generated/model/static";
import {GenModelInputJsonSchema} from "@/shape/ModelInput.ts";

export const {validate: validateSubGroupModelInput} =
    useShapeValidate<DeepReadonly<GenModelInput_TargetOf_subGroups>>(
        GenModelInputJsonSchema,
        "GenModelInput_TargetOf_subGroups",
    )
