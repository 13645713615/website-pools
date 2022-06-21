/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-06-21 18:06:20
 */


import { NDataTable } from "naive-ui";
import { defineComponent, PropType } from "vue";

import { Columns, createColumns } from "./option";

export default defineComponent({
    name: "Table",
    props: {
        type: String,
        loading: Boolean,
        cion: String,
        data: Array as PropType<Columns[]>
    },
    setup(props) {

        const columns = createColumns(props)

        return {
            columns,
            export: () => {
                
            }
        }
    },
    render() {
        return (
            <NDataTable class="table-base" loading={this.loading} scrollX={750} data={this.data} pagination={false} columns={this.columns} />
        )
    }

})




