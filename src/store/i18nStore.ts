import {computed, ref} from "vue";
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

export const useI18nStore = createStore(() => {
    const language = ref<LanguageType>('zh-cn')

    const mainLocale = computed<MainLocale>(() => {
        return languageOptions[language.value].main
    })

    return {
        language,
        mainLocale,
    }
})

export const translate = (keyParam: LocalKeyParam): string => {
    const mainLocale = useI18nStore().mainLocale.value

    if (isString(keyParam)) {
        const translateItem = mainLocale[keyParam]

        if (isString(translateItem)) {
            return translateItem
        } else if (isFunction(translateItem)) {
            // @ts-ignore
            return translateItem()
        }
    } else if (typeof keyParam === "object") {
        const {key, args} = keyParam

        const translateItem = mainLocale[key]

        if (isString(translateItem)) {
            return translateItem
        } else if (isFunction(translateItem)) {
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
