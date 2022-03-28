/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-12 21:50:08
 * @LastEditTime: 2022-03-12 21:57:06
 */

import { NInputGroup, NButton, NIcon } from "naive-ui";
import { defineComponent, ref } from "vue";
import { Search as SearchIcon } from "@vicons/ionicons5"
import Search from "@/components/Search";

export default defineComponent({
    name: "Search",
    setup() {
        const searchRefs = ref<any>(null)
        return {
            searchRefs,
            handleSearch() {
                searchRefs.value?.handleSearch();
            }
        }
    },
    render() {
        return (
            <NInputGroup class="max-w-screen-sm m-auto text-left">
                <Search size="large" ref={(refs) => this.searchRefs = refs} />
                <NButton size="large" type="primary" onClick={this.handleSearch}><NIcon component={SearchIcon} /></NButton>
            </NInputGroup>
        )
    }
})