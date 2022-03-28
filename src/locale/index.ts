/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 16:50:34
 * @LastEditTime: 2022-03-26 21:54:31
 */
import axios from "axios";
import { createI18n, I18n } from "vue-i18n";
import languages from "./lang"

const i18n: I18n = createI18n({ silentTranslationWarn: true })

const loadedLanguages: string[] = [];

const localeName: string[] = Object.keys(languages);

function setLanguage(lang: string): string {
    i18n.global.locale = lang;
    axios.defaults.headers.common['Accept-Language'] = lang
    axios.defaults.headers.common['languageType'] = lang
    document.querySelector("html").setAttribute("lang", lang);
    console.info("[LANG] 切换语言" + lang)
    return lang;
}

async function dispatch(lang: string): Promise<string> {
    if (i18n.global.locale !== lang) {
        if (!loadedLanguages.includes(lang) && localeName.includes(lang)) {
            const modules = await languages[lang]?.load();
            const { numberFormats, message } = modules!.default;
            i18n.global.setLocaleMessage(lang, message);
            i18n.global.setNumberFormat(lang, numberFormats);
        }
        return setLanguage(lang)
    }
    return lang
}

console.info(`[LANG] 国际化语言${localeName.toString()}`)

export { dispatch, localeName }

export default i18n




