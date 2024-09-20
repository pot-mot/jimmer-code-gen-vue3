import {defineStore} from "pinia";
import {ref, computed} from "vue";
import mainZhCn from "@/i18n/zhCn.ts"
import elementZhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
import mainEn from '@/i18n/en.ts'
import elementEn from 'element-plus/es/locale/lang/en.mjs'
import {MainLocale} from "@/i18n";

const languageOptions = {
    'zh-cn': {
        main: mainZhCn,
        element: elementZhCn
    },
    'en': {
        main: mainEn,
        element: elementEn
    },
}

export type LanguageType = keyof typeof languageOptions

export type ElementLocaleType = typeof languageOptions[keyof typeof languageOptions]['element']

export const languageTypes = Object.keys(languageOptions) as LanguageType[]

export const useI18nStore = defineStore(
    'i18nStore',
    () => {
        const language = ref<LanguageType>('zh-cn')

        const mainLocale = computed<MainLocale>(() => {
            return languageOptions[language.value].main
        })

        const elementLocale = computed<ElementLocaleType>(() => {
            return languageOptions[language.value].element
        })

        const translate = (key: keyof MainLocale) => {
            return mainLocale.value[key]
        }

        return {
            language,
            mainLocale,
            elementLocale,
            translate
        }
    }
)
