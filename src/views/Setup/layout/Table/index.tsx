/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-03-25 18:07:20
 */


import { useService } from "@/hooks";
import { getUserLoginInfo } from "@/service/api";
import { NDataTable } from "naive-ui";
import { computed, defineComponent } from "vue";
import { createColumns } from "./option";

export default defineComponent({
    name: "Table",
    setup() {
        const service = useService(getUserLoginInfo, { defaultValue: [], immediate: true })
        const columns = createColumns();
        const tableListData = computed(() => service.data.slice(0, 10))
        return function () {
            return (
                <NDataTable class="mt-5 table-base" scrollX={750} loading={service.loading} data={tableListData.value} pagination={false} columns={columns} size="large" />
            )
        }
    }
})
