import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {prismjsPlugin} from "vite-plugin-prismjs"
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import {fileURLToPath, URL} from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    server: {
        open: true,//启动项目自动弹出浏览器
        port: 4000,//启动端口
        proxy: {
            '/api': {
                target: 'http://localhost:8080',	//实际请求地址
                changeOrigin: true,
            },
        }
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        prismjsPlugin({
            languages: [
                'javascript', 'js', 'typescript', 'ts', "tsx",
                'css', 'html', 'less', 'sass', 'scss',
                'svg', 'icon',
                'markup', "markdown", "md",
                'http', 'uri', 'url',
                'java', 'javadoc', 'kotlin', 'kt', 'kts',
                'sql', 'graphql',
                'json', 'json5', 'jsonp',
                'xml', 'yaml', 'yml', 'ini', 'toml',
                'bash', 'shell', 'batch',
                'docker', 'dockerfile',
                'git',
                'log',
            ],
            'plugins': ['inline-color'],
            css: true
        }),
    ],
})
