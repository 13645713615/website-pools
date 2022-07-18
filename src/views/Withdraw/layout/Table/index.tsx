/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-07-18 18:13:04
 */

import { useService } from "@/hooks";
import { automaticPaymentList, } from "@/service/api";
import { useUser } from "@/store";
import { NDataTable } from "naive-ui";
import { defineComponent, toRef, watch } from "vue";
import { Columns, createColumns } from "./option";

export default defineComponent({
    name: "Table",
    setup() {

        const currentAccountCoin = toRef(useUser(), "currentAccountCoin");

        const tableData = useService<Record<string, Columns>[]>(automaticPaymentList, {
            defaultValue: [], immediate: false, params: () => {
                const [username, coin] = currentAccountCoin.value;
                return { username, coin }
            }
        });


        watch(() => currentAccountCoin.value, ([username, coin]) => tableData.run({ username, coin }), { immediate: true });

        return {
            columns: createColumns(),
            tableData,
        }
    },
    render() {
        return (
            <NDataTable class="mt-5 table-base" scrollX={470} loading={this.tableData.loading} data={this.tableData.data} pagination={false} columns={this.columns} size="large" />
        )
    }
})

