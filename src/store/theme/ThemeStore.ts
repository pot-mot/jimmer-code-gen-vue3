import {defineStore} from 'pinia';
import {ref, watch} from 'vue';

type Theme = 'light' | 'dark'

export const useThemeStore =
    defineStore('themeStore', () => {
        // 默认获取系统的主题色
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const theme = ref<Theme>(systemTheme);

        // 切换主题色
        const toggleTheme = () => {
            theme.value = theme.value === 'dark' ? 'light' : 'dark';
        };

        watch(() => theme.value, (newTheme) => {
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        }, {immediate: true})

        return {
            toggleTheme,
        };
    });
