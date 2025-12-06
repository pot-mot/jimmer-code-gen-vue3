import {computed, readonly, ref} from "vue";
import {localeZhCn} from "@/i18n/zhCn.ts"
import {localeEn} from '@/i18n/en.ts'
import type {LocalKeyParam, MainLocale} from "@/i18n";
import {sendMessage} from "@/components/message/messageApi.ts";
import {createStore} from "@/utils/store/createStore.ts";
import {isString, isFunction} from "@/utils/type/typeGuard.ts";

const languageOptions = {
    'zh-cn': {
        main: localeZhCn,
    },
    'en': {
        main: localeEn,
    },
}

export type LanguageType = keyof typeof languageOptions

export const languageTypes = Object.keys(languageOptions) as LanguageType[]

const language = ref<LanguageType>('zh-cn')

const mainLocale = computed<MainLocale>(() => {
    return languageOptions[language.value].main
})

export const useI18nStore = createStore(() => {
    return {
        language: readonly(language),
        setLanguage: (newLanguage: LanguageType) => {
            language.value = newLanguage
        },
        mainLocale,
    }
})

export const translate = (keyParam: LocalKeyParam): string => {
    if (isString(keyParam)) {
        return mainLocale.value[keyParam]
    } else if (typeof keyParam === "object") {
        const {key, args} = keyParam

        const translateItem = mainLocale.value[key]
        if (isFunction(translateItem)) {
            // @ts-ignore
            return translateItem(...args)
        }

        sendMessage(`key ${key} args ${args} is not valid.`, {type: 'warning'})
        return key
    }

    sendMessage(`keyParam ${keyParam} cannot translate.`, {type: 'warning'})

    if (isString(keyParam)) {
        return keyParam
    } else {
        return `${keyParam}`
    }
}
