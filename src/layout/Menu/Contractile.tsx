/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-28 15:15:50
 * @LastEditTime: 2022-03-16 17:29:25
 */

import { defineComponent, PropType } from "vue";
import { NMenu } from 'naive-ui';
import { MenuMixedOption } from "naive-ui/lib/menu/src/interface";
export default defineComponent({
    name: "Contractile",
    props:{
        options: Array as PropType<MenuMixedOption[]>,
        name: String
    },
    render() {
        return (
            <NMenu value={this.name} class="contractile-menu float-right" options={this.options} mode="horizontal" />
        )
    }
})