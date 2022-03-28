/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-03-15 16:43:55
 */

import { NDataTable } from "naive-ui";
import { defineComponent, PropType } from "vue";
import { Columns, createColumns } from "./option";

export default defineComponent({
    name: "Table",
    props: {
        loading: Boolean,
        data: {
            type: Array,
            default: () => []
        },
        onClick: Function as PropType<(rowData: Columns) => void>
    },
    emits: {
        click: (rowData: Columns) => true
    },
    setup(props, context) {
        return {
            columns: createColumns(context)
        }
    },
    render() {
        return (
            <div>
                <div class="text-center">
                    <b class="block text-2xl font-semibold">{this.$t("title.currency")}</b>
                    <p>{this.$t("title.support")}</p>
                </div>
                <NDataTable class="mt-5 table-base" loading={this.loading} data={this.data} pagination={false} columns={this.columns} size="large" />
            </div>
        )
    }
})