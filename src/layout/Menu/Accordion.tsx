/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-28 15:17:39
 * @LastEditTime: 2022-03-16 17:31:57
 */

import {defineComponent, PropType, renderSlot } from "vue";
import { NMenu, NSpace } from 'naive-ui';
import LocaleSelect from "@/components/LocaleSelect";
import { MenuMixedOption } from "naive-ui/lib/menu/src/interface";

export default defineComponent({
    name: "AccordionMenu",
    props: {
        options: Array as PropType<MenuMixedOption[]>,
        name: String
    },
    render() {
        return (
            <>
                <NMenu value={this.name} class="accordion-menu" options={this.options} ></NMenu>
                <NSpace size={18} class="pt-8" vertical>
                    <LocaleSelect />
                    {renderSlot(this.$slots, "default")}
                </NSpace>
            </>
        )
    }
})