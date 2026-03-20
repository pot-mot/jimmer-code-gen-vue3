/// <reference types="vitest/config" />
import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {prismjsPlugin} from 'vite-plugin-prismjs';
import {fileURLToPath, URL} from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    server: {
        open: true, //启动项目自动弹出浏览器
        port: 4000, //启动端口
        proxy: {
            '/api': {
                target: 'http://localhost:39000', //实际请求地址
                changeOrigin: true,
            },
        },
    },

    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },

    plugins: [
        vue(),
        prismjsPlugin({
            languages: [
                'javascript',
                'js',
                'typescript',
                'ts',
                'tsx',
                'css',
                'html',
                'less',
                'sass',
                'scss',
                'svg',
                'icon',
                'markup',
                'markdown',
                'md',
                'http',
                'uri',
                'url',
                'java',
                'javadoc',
                'kotlin',
                'kt',
                'kts',
                'sql',
                'graphql',
                'json',
                'json5',
                'jsonp',
                'xml',
                'yaml',
                'yml',
                'ini',
                'toml',
                'bash',
                'shell',
                'batch',
                'docker',
                'dockerfile',
                'git',
                'log',
            ],
            plugins: ['inline-color'],
            css: true,
        }),
    ],
    test: {
        globals: false,
        environment: 'jsdom',
    },
    build: {
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        {
                            name: 'vue-flow',
                            test: (id) => id.includes('@vue-flow'),
                        },
                        {
                            name: 'lodash-es',
                            test: (id) => id.includes('lodash-es'),
                        },
                        {
                            name: 'CodeEditor',
                            test: (id) => {},
                        },
                        {
                            name: 'monaco-editor',
                            test: (id) => id.includes('monaco-editor'),
                        },
                        {
                            name: 'prismjs',
                            test: (id) => id.includes('prismjs'),
                        },
                        {
                            name: 'typescript',
                            test: (id) => id.includes('typescript'),
                        },
                    ],
                },
            },
        },
    },
});
