/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-03-27 17:31:59
 */


import AccountSelect from "@/components/AccountSelect";
import { useService } from "@/hooks";
import { deleteAutomaticPay, getAutomaticPayByNameList } from "@/service/api";
import { useUser } from "@/store";
import { NDataTable, NSpace, useDialog } from "naive-ui";
import { computed, defineComponent, toRaw, toRef, watch } from "vue";
import { useI18n } from "vue-i18n";
import AutomaticPayForm, { CreateButton } from "../SetAutomaticPay";
import { Columns, ColumnsType, createColumns } from "./option";

export default defineComponent({
    name: "Table",
    setup() {
        const { t } = useI18n()
        const dialog = useDialog()
        const getAccount = toRef(useUser(), "getAccount")
        const tableService = useService<Columns[]>(getAutomaticPayByNameList, { params: () => getAccount.value, defaultValue: [] })

        const tableData = computed(() => {
            const keysMap = new Map<string, number>();
           return toRaw(tableService.data)?.reduce<Columns[]>((prevValue, row) => {
                if (keysMap.has(row.coin)) {
                    const item = prevValue[keysMap.get(row.coin)];
                    if (!item.children || (row.coin === "eth" && item.children.length == 1)) {
                        const data = { ...item, children: null };
                        if (row.coin != "eth") {
                            item.children = [data];
                        } else {
                            item.children.push(data);
                        }
                        data.type = ColumnsType.Son
                        Object.assign(item, { address: "--", remark: "--", id: "" })
                    }
                    row.type = ColumnsType.Son
                    item.children.push(row)
                    item.scale += row.scale;
                } else {
                    row.type = ColumnsType.Father
                    prevValue.push(row)
                    keysMap.set(row.coin, prevValue.length - 1);
                    if (row.coin === "eth") {
                        row.children = [{ type: ColumnsType.PayStatus, coin: row.coin }]
                    }
                }
                return prevValue
            }, [])
        })

        watch(getAccount, (value) => {
            if (value) {
                tableService.run()
            }
        }, { immediate: true })

        function handleDelete(row: Columns) {
            const d = dialog.warning({
                title: t("dialog.warning.openAutomatic"),
                content: '确定删除？',
                positiveText: t("dialog.warning..penAutomatic"),
                negativeText: t("dialog.warning.openAutomatic"),
                onPositiveClick: async () => {
                    d.loading = true
                    await deleteAutomaticPay(row.id);
                    tableService.run();
                    return true;
                }
            })
        }

        return {
            tableData,
            columns: createColumns({ handleDelete }),
            tableService,
            rowKey(row: Columns) {
                return row.coin
            },
            handleTableRowData() {
                tableService.run();
            },
            handleObtainScales(coin: string, next: (scale: number) => void) {
                next(tableData.value.find((item) => item.coin === coin)?.scale || 0)
            }
        }
    },
    render() {
        return (
            <div>
                <NSpace align="center" justify="space-between" size="large" >
                    <h3 class="text-2xl"> {this.$t("title.withdrawalRatio")}</h3>
                    <NSpace align="center">
                        <AccountSelect mode="select" class="w-32"></AccountSelect>
                        <CreateButton class="w-32"></CreateButton>
                    </NSpace>
                </NSpace>
                <NDataTable rowKey={this.rowKey} defaultExpandedRowKeys={["eth"]} class="table-base table-base-expand" scrollX={960} loading={this.tableService.loading} data={this.tableData} pagination={false} columns={this.columns} size="large" />
                <AutomaticPayForm onScales={this.handleObtainScales} onFinish={this.handleTableRowData}></AutomaticPayForm>
            </div>
        )
    }
})