/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-06-21 18:01:09
 * @LastEditTime: 2022-06-21 18:11:52
 */

import { NButton } from "naive-ui";
import { defineComponent, renderSlot } from "vue";
import { utils, write } from 'xlsx'
import FileSaver from 'file-saver'

export default defineComponent({
    name: "ExportButton",
    props: {
        path: String,
        fileName: String,
    },
    setup(props, { slots }) {

        const handle = {
            onClick: () => {
                const wb = utils.table_to_book(document.querySelector(props.path));
                const wbout = write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
                try {
                    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${props.fileName}.xlsx`);
                } catch (e) {
                    console.log(e, wbout);
                }
            }
        }
        return () => <NButton type="primary" onClick={handle.onClick}>{renderSlot(slots, "default")}</NButton>
    }
})