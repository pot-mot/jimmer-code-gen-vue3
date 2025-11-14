import {jsonPrettyFormat} from "@/utils/json/jsonStringify.ts";
import {saveAs} from "file-saver";

export const downloadJson = <T extends object>(file: {name: string, content: T}) => {
    const fileBlob = new Blob(
        [jsonPrettyFormat(file.content)],
        {type: "application/octet-stream"}
    )
    saveAs(fileBlob, file.name)
}