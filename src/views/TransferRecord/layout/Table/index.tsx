/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-05-05 15:53:12
 */

import { useService } from "@/hooks/service";
import { getSettlementList } from "@/service/api";
import { ProvideLoad, ProvideWalletInfo } from "@/views/Miner/provide";
import { NDataTable, NSpace } from "naive-ui";
import { defineComponent, inject, onMounted, } from "vue";
import { createColumns } from "./option";

export default defineComponent({
    name: "Table",
    setup() {
        const onload = inject(ProvideLoad);

        const walletInfo = inject(ProvideWalletInfo);

        const tableData = useService<Record<string, any>[]>(getSettlementList, {
            immediate: true,
            params() {
                const { coin, wallet: accountName, token } = walletInfo.value;
                return { coin, accountName, token }
            },
            defaultValue: []
        });

        onMounted(() => onload().subscribe(() => tableData.run()));

        return {
            columns: createColumns(),
            tableData,
        }
    },
    render() {
        return (
            <div>
                <NSpace class="mb-3 mt-8" align="center">
                    <h2>{this.$t("title.settlementtable")}</h2>
                </NSpace>
                <NDataTable class="table-base" scrollX={660} loading={this.tableData.loading} data={this.tableData.data} columns={this.columns} size="large" />
            </div>
        )
    }
})