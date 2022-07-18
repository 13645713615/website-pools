/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-07-18 17:47:07
 * @LastEditTime: 2022-07-18 17:56:14
 */

import { useService } from "@/hooks";
import { automaticPaymenCancelt } from "@/service/api";
import { useUser } from "@/store";
import { NButton, useMessage } from "naive-ui";
import { defineComponent, toRef } from "vue";


export default defineComponent({
    name: "CancelButton",
    props: {
        disabled: Boolean
    },
    emits: {
        click: () => true
    },
    setup(props, { emit }) {

        const { error } = useMessage();

        const currentAccountCoin = toRef(useUser(), "currentAccountCoin");

        const service = useService(automaticPaymenCancelt, {
            defaultValue: null, params: () => ({
                username: currentAccountCoin.value[0],
                coin: currentAccountCoin.value[1]
            })
        }, (_, res) => {
            if (res.status != 200) {
                error(res.message);
            } else {
                emit("click")
            }
        })

        return () => (
            <NButton type="warning" disabled={props.disabled} onClick={() => service.run()} loading={service.loading}>
                取消申请
            </NButton>
        )
    }
})