/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-28 15:16:22
 * @LastEditTime: 2022-03-27 14:38:48
 */

import { defineComponent, PropType, renderSlot } from "vue";
import { NIcon, NMenu, NSpace } from 'naive-ui';
import Search from "@/components/Search";
import { MenuMixedOption } from "naive-ui/lib/menu/src/interface";
import { Search as SearchIcon  } from "@vicons/ionicons5";
export default defineComponent({
    name: "Expandet",
    props: {
        left: Array as PropType<MenuMixedOption[]>,
        right: Array as PropType<MenuMixedOption[]>,
        name: String
    },
    render() {
        return (
            <div class="flex items-center">
                <NMenu iconSize={0}  value={this.name} options={this.left} class="float-left menu-expandet"  mode="horizontal" />
                <div class="flex-1 flex items-center justify-end">
                    <div class="flex-1 max-w-xs  min-w-5 mr-5"><Search v-slots={{ suffix:()=> <NIcon component={SearchIcon} />}}/></div>
                    <NMenu expandIcon={()=>false} value={this.name} options={this.right} class="float-right menu-expandet" mode="horizontal" />
                    <NSpace align="center" size={18}>
                        {renderSlot(this.$slots, "default")}
                    </NSpace>
                </div>
            </div>
        )
    }
})