/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-28 18:01:15
 * @LastEditTime: 2022-03-26 10:44:09
 */

import { useApp } from "@/store";
import {  NAvatar, NSelect } from "naive-ui";
import { computed, defineComponent, PropType } from "vue";
import languages from "@/locale/lang"

export default defineComponent({
    name: "LocaleSelect",
    props: {
        size: String as PropType<'small' | 'medium' | 'large'>,
        showArrow: Boolean
    },
    setup(props) {
        const { setLanguage, $state } = useApp();
        return {
            value: computed(() => $state.language),
            className: computed<string>(() => props.showArrow ? '' : 'select-hide-arrow'),
            options: Object.keys(languages).map((lang) => ({ label: () => <div class="flex items-center justify-center"><NAvatar class="bg-transparent mr-2"  size={15} src={languages[lang].icon} />{languages[lang].name}</div>, value: lang })),
            setLanguage
        }
    },
    render() {
        return (
            <NSelect class={this.className} value={this.value} size={this.size} onUpdateValue={this.setLanguage} showArrow={this.showArrow} options={this.options} />
        )
    }
})