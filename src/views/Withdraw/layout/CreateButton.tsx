/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-07-18 16:49:45
 * @LastEditTime: 2022-07-18 17:27:34
 */

import { useService } from "@/hooks";
import { automaticPayment } from "@/service/api";
import { useUser } from "@/store";
import { NButton, useMessage } from "naive-ui";
import { defineComponent, toRef } from "vue";


export default defineComponent({
    name: "CreateButton",
    emits: {
        click: () => true
    },
    setup(_, { emit }) {

        const { error, success } = useMessage();

        const currentAccountCoin = toRef(useUser(), "currentAccountCoin");

        const service = useService(automaticPayment, {
            defaultValue: null, params: () => ({
                username: currentAccountCoin.value[0],
                coin: currentAccountCoin.value[1]
            })
        }, (_, res) => {
            if (res.status != 200) {
                error(res.message);
            } else {
                success(res.message);
                emit("click")
            }
        })

        return () => (
            <NButton type="primary" onClick={() => service.run()} loading={service.loading}>
                申请提币
            </NButton>
        )
    }
})