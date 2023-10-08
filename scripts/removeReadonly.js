import fs from "fs";
import path from "path";

// 替换目录路径
const modelPath = 'src/api/__generated/model';
const servicePath = 'src/api/__generated/services';

// 递归遍历目录中的所有文件
function traverseDirectory(directoryPath) {
    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            traverseDirectory(filePath);
        } else if (stats.isFile() && path.extname(filePath) === '.ts') {
            replaceInFile(filePath);
        }
    });
}

// 替换文件中的文本
function replaceInFile(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const updatedContent = fileContent
        .replaceAll("readonly ", "")
        .replace(/ReadonlyArray<(\S+)>/g, "$1[]")
        .replaceAll("ReadonlyMap", "Map")
        .replace(/Map<(\S+), (\S+)>/g, "{ [key: $1]: $2 }");
    fs.writeFileSync(filePath, updatedContent, 'utf8');
}

// 执行替换操作
traverseDirectory(modelPath);
traverseDirectory(servicePath);
