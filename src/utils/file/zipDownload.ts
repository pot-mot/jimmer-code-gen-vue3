import {saveAs} from "file-saver";
import JSZip from "@progress/jszip-esm";

const createZip = async (files: DeepReadonly<Record<string, string | undefined>>): Promise<Blob> => {
    const zip = new JSZip()

    Object.entries(files).forEach(([path, content]) => {
        if (content === undefined) {
            zip.folder(path)
        } else {
            zip.file(path, content)
        }
    })

    return await zip.generateAsync({type: "blob"})
}

export const downloadZip = async (
    name: string,
    generateFiles: DeepReadonly<Record<string, string | undefined>>
) => {
    const file = await createZip(generateFiles)
    saveAs(file, name)
}
