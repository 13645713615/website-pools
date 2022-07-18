/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-07-18 15:45:30
 * @LastEditTime: 2022-07-18 18:14:10
 */

import { computed, defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import CancelButton from "./layout/CancelButton";
import CreateButton from "./layout/CreateButton";
import Filter from "./layout/Filter";
import Table from "./layout/Table";

export default defineComponent({
    name: "Withdraw",
    setup() {
        const { t } = useI18n();
        const tableRefs = ref();
        const  disabled = computed(() => !tableRefs.value?.tableData.data?.length);
        const handle = {
            onRefresh: () => {
                tableRefs.value?.tableData.run();
            }
        }
        return () => (
            <div class="min-h-ctx">
                <div class="flex items-center justify-between flex-wrap">
                    <h3 class="text-xl">小额提币</h3>
                    <div class="flex items-center gap-x-3">
                        <Filter></Filter>
                        <CreateButton onClick={handle.onRefresh}></CreateButton>
                        <CancelButton disabled={disabled.value} onClick={handle.onRefresh}></CancelButton>
                    </div>
                </div>
                <Table ref={(refs) => tableRefs.value = refs}></Table>
            </div>
        )
    }
})