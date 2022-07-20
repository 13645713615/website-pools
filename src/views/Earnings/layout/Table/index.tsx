/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-07-20 11:11:53
 */


import { Page } from "@/hooks";
import { NDataTable, NPagination, PaginationProps } from "naive-ui";
import { computed, defineComponent, PropType } from "vue";

import { createColumns } from "./option";

export default defineComponent({
    name: "Table",
    props: {
        type: String,
        loading: Boolean,
        cion: String,
        data: {
            type: Object as PropType<Page<Record<string, any>>>,
            default: () => ({
                total: 1,
                current: 1,
                size: 30,
                records: [],
            })
        },
    },
    inheritAttrs: false,
    emits: {
        'updatePage': (_page: number) => true,
        'updatePageSize': (_pageSize: number) => true
    },
    setup(props, context) {

        const columns = createColumns(props)

        const handle = {
            onUpdatePage: (page: number) => {
                context.emit("updatePage", page)
            },
            onUpdatePageSize: (pageSize: number) => {
                context.emit("updatePageSize", pageSize)
            },
        }

        return {
            columns,
            pagination: computed<PaginationProps>(() => ({
                itemCount: props.data.total,
                page: props.data.current,
                pageSize: props.data.size,
                pageSlot: 5,
                ...handle,
            }))
        }
    },
    render() {
        return (
            <>
                <NDataTable  {...this.$attrs} class="table-base" loading={this.loading} scrollX={900} data={this.data.records} columns={this.columns} />
                <NPagination class="mt-3" {...this.pagination} pageSizes={[10,20,30,60]} showSizePicker></NPagination>
            </>
        )
    }

})




