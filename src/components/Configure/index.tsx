
/*
* @Descripttion: 
* @version: 
* @Author: Carroll
* @Date: 2022-02-27 09:55:10
 * @LastEditTime: 2022-05-03 12:46:58
*/

import { defineComponent, ref, renderSlot, watch } from "vue";
import { NConfigProvider, NDateLocale, NLocale, zhCN, dateZhCN, enUS, dateEnUS, NMessageProvider, NNotificationProvider, useMessage, NDialogProvider } from 'naive-ui'
import { strPure } from "@/utils/tools";
import themeOverrides from "./theme";

function loaded(lang: string): [NLocale, NDateLocale] {
    switch (strPure(lang)) {
        case "zh":
            return [zhCN, dateZhCN]
        default:
            return [enUS, dateEnUS]
    }
}
const breakpoints = { xs: 0, s: 640, m: 768, l: 1024, xl: 1280, xxl: 1536 }

export default defineComponent({
    name: "Configure",
    props: {
        language: String
    },
    setup(props) {
        const locale = ref<NLocale>(null)
        const dateLocale = ref<NDateLocale>(null);
        watch(() => props.language, () => {
            [locale.value, dateLocale.value] = loaded(props.language)
        }, { immediate: true })

        return { locale, dateLocale }
    },
    render() {
        return (
            <NConfigProvider breakpoints={breakpoints} locale={this.locale} dateLocale={this.dateLocale} themeOverrides={themeOverrides}>
                <NMessageProvider duration={5000} max={4} keepAliveOnHover container-style={{ top: "4.5rem" }} placement="top-right">
                    <NNotificationProvider max={2}>
                        <NDialogProvider>
                            {renderSlot(this.$slots, "default")}
                        </NDialogProvider>
                    </NNotificationProvider>
                </NMessageProvider>
            </NConfigProvider >
        )
    }
})

