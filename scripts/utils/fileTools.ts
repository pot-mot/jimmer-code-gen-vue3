import fs from "fs";
import path from "path";
import {ensureDirExists} from "./checkFileExisted";

export type FileItem = {
    fileName: string;
    content: string;
}

export const getTsFiles = (dirPath: string): FileItem[] => {
    let results: FileItem[] = [];

    const walk = (currentPath: string) => {
        const files = fs.readdirSync(currentPath);

        for (const file of files) {
            const fullPath = path.join(currentPath, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                walk(fullPath); // 递归遍历子目录
            } else if (file.endsWith(".ts")) {
                results.push({
                    fileName: path.relative(dirPath, fullPath).replace(/\\/g, "/"), // 保持相对路径
                    content: String(fs.readFileSync(fullPath, "utf-8")).replace(/\r\n/g, "\n"),
                });
            }
        }
    };

    walk(dirPath);
    return results;
};

export const getDeclareTsFiles = (dirPath: string) => {
    let results: FileItem[] = [];

    const walk = (currentPath: string) => {
        const files = fs.readdirSync(currentPath);

        for (const file of files) {
            const fullPath = path.join(currentPath, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                walk(fullPath); // 递归遍历子目录
            } else if (file.endsWith(".d.ts")) {
                results.push({
                    fileName: path.relative(dirPath, fullPath).replace(/\\/g, "/"), // 保持相对路径
                    content: String(fs.readFileSync(fullPath, "utf-8")).replace(/\r\n/g, "\n"),
                });
            }
        }
    };

    walk(dirPath);
    return results;
}

export const cleanDir = (dirPath: string) => {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, {recursive: true})
    }
    fs.mkdirSync(dirPath, {recursive: true})
}

export const writeFiles = (files: FileItem[]) => {
    for (const file of files) {
        const dirPath = path.dirname(file.fileName)
        ensureDirExists(dirPath)
        fs.writeFileSync(file.fileName, file.content, "utf-8")
    }
}
