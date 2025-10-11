/// <reference types="vitest/config" />
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {prismjsPlugin} from "vite-plugin-prismjs"
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
        },
    },

    plugins: [
        vue(),
        vueDevTools(),
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
    test: {
        globals: false,
        environment: 'jsdom',
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'vue': ['vue'],
                    'vue-flow': ['@vue-flow/core', '@vue-flow/node-toolbar'],
                    'lodash': ['lodash-es'],
                    'monaco-editor': ['monaco-editor'],
                    'prismjs': ['prismjs'],
                    'html-to-image': ['html-to-image'],
                    'typescript': ['typescript'],
                }
            }
        }
    }
})
