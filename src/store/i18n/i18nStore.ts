import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {localeZhCn} from "@/i18n/zhCn.ts"
import elementZhCn from 'element-plus/es/locale/lang/zh-cn.mjs'
import {localeEn} from '@/i18n/en.ts'
import elementEn from 'element-plus/es/locale/lang/en.mjs'
import {ProjectLocale, MainLocaleKeyParam, ProjectLocaleKeyParam} from "@/i18n";
import {sendMessage} from "@/message/message.ts";

const languageOptions = {
    'zh-cn': {
        main: localeZhCn,
        element: elementZhCn
    },
    'en': {
        main: localeEn,
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

        const mainLocale = computed<ProjectLocale>(() => {
            return languageOptions[language.value].main
        })

        const elementLocale = computed<ElementLocaleType>(() => {
            return languageOptions[language.value].element
        })

        const translate = (
            keyParam: MainLocaleKeyParam | ProjectLocaleKeyParam
        ): string => {
            if (typeof keyParam === "string" && keyParam in mainLocale.value) {
                const translateItem = mainLocale.value[keyParam]

                if (typeof translateItem === "string") {
                    return translateItem
                } else if (typeof translateItem === "function") {
                    return (translateItem as any)()
                }
            } else if (typeof keyParam === "object") {
                const {key, args} = keyParam

                const translateItem = mainLocale.value[key]

                if (typeof translateItem === "string") {
                    return translateItem
                } else if (typeof translateItem === "function") {
                    return (translateItem as any)(...args)
                }

                sendMessage(`key ${key} args ${args} is not valid.`, 'warning')
                return key
            }

            sendMessage(`keyParam ${keyParam} cannot translate.`, 'warning')
            return keyParam
        }

        return {
            language,
            mainLocale,
            elementLocale,
            translate
        }
    }
)
