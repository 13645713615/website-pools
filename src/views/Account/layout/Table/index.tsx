/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-05-18 16:17:19
 */

import { useService, IRes } from "@/hooks";
import { useApp, useUser } from "@/store";
import { NDataTable } from "naive-ui";
import { defineComponent, toRef } from "vue";
import { useRouter } from "vue-router";
import { Columns, createColumns } from "./option";

export default defineComponent({
    name: "Table",
    props: {
        account: {
            type: String,
            required: true
        }
    },
    setup(props) {
        // const userStore = useUser();
        const { push } = useRouter()
        const supportCoin = toRef(useApp(), "supportCoin")
        const tableData = useService<Record<string, any>[]>(getAccountCoinList, { defaultValue: [], params: () => ({ coins: supportCoin.value, account: props.account }), immediate: true });

        // watch(() => userStore.getAccount, (value) => tableData.run({ coins: supportCoin.value, account: value }), { immediate: true });

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

