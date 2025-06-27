import * as Prism from 'prismjs';

export const vueLanguage = {
    ...Prism.languages.markup, // 基于 HTML 语言扩展
    script: {
        pattern: /(<script.*?>)([\s\S]*?)(?=<\/script>)/i,
        lookbehind: true,
        inside: Prism.languages.javascript || Prism.languages.typescript
    },
    style: {
        pattern: /(<style.*?>)([\s\S]*?)(?=<\/style>)/i,
        lookbehind: true,
        inside: Prism.languages.css
    },
    template: {
        pattern: /(<template.*?>)([\s\S]*?)(?=<\/template>)/i,
        lookbehind: true,
        inside: Prism.languages.markup
    }
}