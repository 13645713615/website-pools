/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-03 11:31:36
 * @LastEditTime: 2022-06-21 10:49:55
 */

import { NDataTable } from "naive-ui";
import { defineComponent, PropType} from "vue";
import { useRouter } from "vue-router";
import { Columns, createColumns } from "./option";

export default defineComponent({
    name: "Table",
    props: {
        cion: String,
        data: Array as PropType<Columns[]>
    },
    setup(props) {
        const { push } = useRouter()
        const columns = createColumns()
        const handle = {
            rowProps(row: Columns) {
                return {
                    style: 'cursor: pointer;',
                    onClick: () => {
                        push({
                            name: "state", params: {
                                coin: props.cion,
                                wallet: row.minerName
                            }
                        })
                    }
                }

            }
        }
        return () => (
            <NDataTable rowProps={handle.rowProps} class="table-base" scrollX={600} data={props.data} pagination={false} columns={columns} />
        )
    }

})




