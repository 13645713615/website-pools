/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-05-17 15:02:25
 */

import { useService, IRes } from "@/hooks";
import { useApp, useUser } from "@/store";
import { NDataTable } from "naive-ui";
import { defineComponent, toRef, watch } from "vue";
import { useRouter } from "vue-router";
import { Columns, createColumns } from "./option";

export default defineComponent({
    name: "Table",
    setup() {
        const userStore = useUser();
        const { push } = useRouter()
        const supportCoin = toRef(useApp(), "supportCoin")
        const tableData = useService<Record<string, any>[]>(getAccountCoinList, { defaultValue: [] });

        watch(() => userStore.getAccount, (value) => tableData.run({ coins: supportCoin.value, account: value }), { immediate: true });

        return {
            columns: createColumns(),
            tableData,
            rowProps(row: Columns) {
                if (row.offline + row.online) {
                    return {
                        style: 'cursor: pointer;',
                        onClick: () => {
                            push({
                                name: "state", params: {
                                    coin: row.currency,
                                    wallet: row.accountName
                                }
                            })
                        }
                    }
                }
            }
        }
    },
    render() {
        return (
            <NDataTable rowProps={this.rowProps} class="mt-5 table-base" scrollX={980} loading={this.tableData.loading} data={this.tableData.data} pagination={false} columns={this.columns} size="large" />
        )
    }
})


async function getAccountCoinList({ account, coins }: { account: string, coins: string[] }): Promise<IRes<any[]>> {
    const { getUserAccountCoin } = useUser()
    return {
        status: 200,
        data: coins.reduce((previousValue, coin) => {
            const value = getUserAccountCoin({ account, coin })
            if (value) {
                previousValue.push(value)
            }
            return previousValue
        }, []),
        message: ""
    }
}

