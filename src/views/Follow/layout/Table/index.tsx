/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-05-03 12:48:38
 */

import { useService } from "@/hooks";
import { deleteFollow, getFollow } from "@/service/api";
import { NDataTable } from "naive-ui";
import { defineComponent } from "vue";
import { Columns, createColumns } from "./option";

export default defineComponent({
    name: "Table",
    setup() {
        const tableData = useService<Record<string, Columns>[]>(getFollow, { defaultValue: [], immediate: true });

        function handleDelete(data: Columns) {
            deleteFollow(data.collectUrl).then(() => tableData.run())
        }

        return {
            columns: createColumns({ handleDelete }),
            tableData,
        }
    },
    render() {
        return (
            <NDataTable class="mt-5 table-base" scrollX={1030} loading={this.tableData.loading} data={this.tableData.data} pagination={false} columns={this.columns} size="large" />
        )
    }
})

