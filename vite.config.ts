import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {prismjsPlugin} from "vite-plugin-prismjs"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        prismjsPlugin({
            languages: [
                'javascript', 'typescript',
                'css', 'css-extras', 'html', 'less', 'sass', 'scss',
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
            'plugins': ['copy-to-clipboard', 'inline-color'],
            css: true
        }),
    ],
    server: {
        open: true,//启动项目自动弹出浏览器
        port: 4000,//启动端口
        proxy: {
            '/api': {
                target: 'http://localhost:8080',	//实际请求地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
        }
    }
})
