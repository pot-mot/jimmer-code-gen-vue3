import fs from "fs"
import path from "path"

// 递归遍历目录中的所有文件
function traverseDirectory(directoryPath, replaceFn) {
    const files = fs.readdirSync(directoryPath)

    files.forEach((file) => {
        const filePath = path.join(directoryPath, file)
        const stats = fs.statSync(filePath)

        if (stats.isDirectory()) {
            traverseDirectory(filePath)
        } else if (stats.isFile() && path.extname(filePath) === '.ts') {
            const fileContent = fs.readFileSync(filePath, 'utf8')
            const updatedContent = replaceFn(fileContent)
            fs.writeFileSync(filePath, updatedContent, 'utf8')
        }
    })
}

function traverseFile(filePath, replaceFn) {
    const file = fs.statSync(filePath)

    if (file && file.isFile()) {
        const fileContent = fs.readFileSync(filePath, 'utf8')
        const updatedContent = replaceFn(fileContent)
        fs.writeFileSync(filePath, updatedContent, 'utf8')
    }
}

// 执行替换操作
traverseFile("src/api/index.ts", (content) => {
    return content
        .replace("// const BASE_URL = \"/api\";", "const BASE_URL = \"/api\";")
        .replace("const BASE_URL = \"\";", "// const BASE_URL = \"\";")
})

// 执行替换操作
traverseFile("vite.config.ts", (content) => {
    return content
        .replace(
            "        // proxy: {\n" +
            "        //     '/api': {\n" +
            "        //         target: 'http://localhost:8080',\t//实际请求地址\n" +
            "        //         changeOrigin: true,\n" +
            "        //         rewrite: (path) => path.replace(/^\\/api/, '')\n" +
            "        //     },\n" +
            "        // }",
            "        proxy: {\n" +
            "            '/api': {\n" +
            "                target: 'http://localhost:8080',\t//实际请求地址\n" +
            "                changeOrigin: true,\n" +
            "                rewrite: (path) => path.replace(/^\\/api/, '')\n" +
            "            },\n" +
            "        }",
        )
})
