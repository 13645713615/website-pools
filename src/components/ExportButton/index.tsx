/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-06-21 18:01:09
 * @LastEditTime: 2022-08-12 15:50:45
 */

import { NButton } from "naive-ui";
import { defineComponent, renderSlot } from "vue";
import { exportTable } from "@/utils/export";

export default defineComponent({
    name: "ExportButton",
    props: {
        path: String,
        fileName: String,
    },
    setup(props, { slots }) {

        const handle = {
            onClick: () => {
                exportTable(props.path,props.fileName)
            }
        }
        return () => <NButton type="primary" onClick={handle.onClick}>{renderSlot(slots, "default")}</NButton>
    }
})