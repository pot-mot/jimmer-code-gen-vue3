import {readonly, ref, watch} from "vue";
import {createStore} from "@/utils/store/createStore.ts";
import {tinycolor} from "vue-color";

type Theme = 'light' | 'dark'

const theme = ref<Theme>('light')

watch(() => theme.value, (newTheme) => {
    if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}, {immediate: true})

const defaultPrimaryColor = '#1E90FF'
const primaryColor = ref<string>(defaultPrimaryColor)
watch(() => primaryColor.value, (newPrimaryColor) => {
    document.documentElement.style.setProperty("--primary-color", newPrimaryColor)
    document.documentElement.style.setProperty("--primary-color-opacity-background", tinycolor(newPrimaryColor).setAlpha(0.1).toRgbString())
})

export const initThemeStore = async () => {
    try {
        theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        const initPrimaryColor = window.getComputedStyle(document.documentElement).getPropertyValue("--primary-color").toLowerCase()
        if (initPrimaryColor) {
            primaryColor.value = initPrimaryColor
        }
    } catch (e) {}
}

export const useThemeStore = createStore(() => {
    return {
        theme: readonly(theme),
        setTheme: (newTheme: Theme) => {
            theme.value = newTheme
        },
        toggleTheme: () => {
            theme.value = theme.value === 'dark' ? 'light' : 'dark';
        },

        primaryColor: readonly(primaryColor),
        setPrimaryColor: (newPrimaryColor: string) => {
            primaryColor.value = newPrimaryColor
        },
        resetPrimaryColor: () => {
            primaryColor.value = defaultPrimaryColor
        },
    };
})