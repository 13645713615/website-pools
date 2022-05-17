/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-04-29 15:59:33
 * @LastEditTime: 2022-05-17 16:01:01
 */

import { useService } from "@/hooks";
import { setCleanHours } from "@/service/api";
import { useUser } from "@/store";
import { NSelect, NSpace, useMessage } from "naive-ui";
import { SelectMixedOption } from "naive-ui/lib/select/src/interface";
import { computed, defineComponent, onActivated, reactive, toRef, watch } from "vue";

const options: SelectMixedOption[] = [{ value: 24, label: '24h' }, { value: 48, label: '48h' }, { value: 72, label: '72h' }];

export default defineComponent({
    name: "CleanHours",
    setup() {

        const storeUser = useUser();
        const getAccount = toRef(storeUser, "getAccount");
        const message = useMessage()
        const { getUserAccountCoin, setUserAccount } = storeUser

        const accountInfo = reactive<{ accountId?: number, hours?: number }>({ accountId: null, hours: null })

        const service = useService(setCleanHours, { defaultValue: {} }, (_, res) => {
            if (res.status != 200) {
                message.error(res.message)
            }
        });

        function setAccountInfo() {
            const data = getUserAccountCoin();
            if (data) {
                [accountInfo.accountId, accountInfo.hours] = [data.accountId, data.cleanHours]
            } else {
                [accountInfo.accountId, accountInfo.hours] = [null, null]
            }
        }

        watch(() => getAccount.value, setAccountInfo);

        onActivated(setAccountInfo)

        const cleanHours = computed<number>({
            get: () => accountInfo.hours,
            set(value) {
                if (accountInfo.accountId) {
                    service.run({ ...accountInfo, hours: value }, () => {
                        accountInfo.hours = value
                        setUserAccount(getAccount.value, { cleanHours: value })
                    })
                }
            }
        })

        return () => <NSpace align="center">
            <span>清理离线矿机周期</span>
            <NSelect loading={service.loading} v-model={[cleanHours.value, "value"]} class="w-32" options={options}></NSelect>
        </NSpace>
    }
})