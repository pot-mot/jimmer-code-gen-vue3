import {readonly, ref, watch} from "vue";
import {createStore} from "@/utils/store/createStore.ts";
import {tinycolor} from "vue-color";

export type Theme = 'light' | 'dark'

export const useThemeStore = createStore(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = ref<Theme>(systemTheme)

    watch(() => theme.value, (newTheme) => {
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, {immediate: true})

    const setTheme = (newTheme: Theme) => {
        theme.value = newTheme
    }

    const toggleTheme = () => {
        theme.value = theme.value === 'dark' ? 'light' : 'dark';
    }

    const initPrimaryColor = window.getComputedStyle(document.documentElement).getPropertyValue("--primary-color").toLowerCase()
    document.documentElement.style.setProperty("--primary-color-opacity-background", tinycolor(initPrimaryColor).setAlpha(0.1).toRgbString())
    const primaryColor = ref<string>(initPrimaryColor)

    watch(() => primaryColor.value, (newPrimaryColor) => {
        document.documentElement.style.setProperty("--primary-color", newPrimaryColor)
        document.documentElement.style.setProperty("--primary-color-opacity-background", tinycolor(newPrimaryColor).setAlpha(0.1).toRgbString())
    })

    const setPrimaryColor = (newPrimaryColor: string) => {
        primaryColor.value = newPrimaryColor
    }

    return {
        theme: readonly(theme),
        setTheme,
        toggleTheme,

        primaryColor: readonly(primaryColor),
        setPrimaryColor,
    };
})