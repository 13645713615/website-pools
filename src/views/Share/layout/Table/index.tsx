/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-05-17 16:00:11
 */

import { useService } from "@/hooks";
import { delShareAddress, getShareAddressList } from "@/service/api";
import { useUser } from "@/store";
import { isEmpty } from "@/utils/tools";
import { NDataTable, useDialog } from "naive-ui";
import { computed, defineComponent, onMounted, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ShareForm } from "../Create";
import { Columns, createColumns } from "./option";

export default defineComponent({
    name: "Table",
    setup() {
        const { query } = useRoute()
        const dialog = useDialog()
        const { t } = useI18n()
        const userStore = useUser()
        const currentAccountCoin = toRef(userStore, "currentAccountCoin")
        const tableService = useService<Record<string, any>[]>(getShareAddressList, {
            params: () => {
                const [accountName, coin] = currentAccountCoin.value
                return { accountName, coin }
            }, defaultValue: []
        });

        watch(currentAccountCoin, () => tableService.run(), { deep: true })

        onMounted(() => {
            if (!isEmpty(query)) {
                const { accountName, coin } = query as { [x: string]: string };
                userStore.$patch((state) => {
                    state.currentAccountCoin = [accountName, coin]
                })
            } else {
                tableService.run()
            }
        })

        function handleDelete(row: Columns) {
            const d = dialog.warning({
                title: t("dialog.warning.title"),
                content: t("dialog.warning.delete"),
                positiveText: t("dialog.warning.positiveText"),
                negativeText: t("dialog.warning.negativeText"),
                onPositiveClick: async () => {
                    d.loading = true
                    await delShareAddress(row);
                    tableService.run();
                    return true;
                }
            })
        }

        return {
            columns: createColumns({ handleDelete }),
            tableService,
            handleTableRowData() {
                tableService.run();
            },
        }
    },
    render() {
        return (
            <>
                <NDataTable class="mt-5 table-base" scrollX={980} loading={this.tableService.loading} data={this.tableService.data} pagination={false} columns={this.columns} size="large" />
                <ShareForm onFinish={this.handleTableRowData}></ShareForm>
            </>
        )
    }
})