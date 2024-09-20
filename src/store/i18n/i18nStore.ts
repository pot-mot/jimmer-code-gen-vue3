import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {mainLocaleZhCn} from "@/i18n/zhCn.ts"
import elementZhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
import {mainLocaleEn} from '@/i18n/en.ts'
import elementEn from 'element-plus/es/locale/lang/en.mjs'
import {type MainLocale} from "@/i18n";

const languageOptions = {
    'zh-cn': {
        main: mainLocaleZhCn,
        element: elementZhCn
    },
    'en': {
        main: mainLocaleEn,
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
