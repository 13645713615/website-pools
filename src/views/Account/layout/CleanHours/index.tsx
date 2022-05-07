/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-04-29 15:59:33
 * @LastEditTime: 2022-04-29 17:28:19
 */

import { useService } from "@/hooks";
import { setCleanHours } from "@/service/api";
import { useUser } from "@/store";
import { NSelect, NSpace } from "naive-ui";
import { SelectMixedOption } from "naive-ui/lib/select/src/interface";
import { computed, defineComponent, reactive, toRef, watch } from "vue";

const options: SelectMixedOption[] = [{ value: 24, label: '24h' }, { value: 48, label: '48h' }, { value: 72, label: '72h' }];

export default defineComponent({
    name: "CleanHours",
    setup() {

        const storeUser = useUser();
        const getAccount = toRef(storeUser, "getAccount")
        const { getUserAccountCoin, setUserAccount } = storeUser

        const accountInfo = reactive<{ accountId?: number, hours?: number }>({ accountId: null, hours: null })

        const service = useService(setCleanHours, { defaultValue: {}, params: () => accountInfo }, () => {
            setUserAccount(getAccount.value, { cleanHours: accountInfo.hours })
        });

        watch(() => getAccount.value, () => {
            const data = getUserAccountCoin();
            if (data) {
                [accountInfo.accountId, accountInfo.hours] = [data.accountId, data.cleanHours]
            } else {
                [accountInfo.accountId, accountInfo.hours] = [null, null]
            }
        }, { immediate: true });


        const cleanHours = computed<number>({
            get: () => accountInfo.hours,
            set(value) {
                accountInfo.hours = value
                if (accountInfo.accountId) {
                    service.run()
                }
            }
        })

        return () => <NSpace align="center">
            <span>清理离线矿机周期</span>
            <NSelect loading={service.loading} v-model={[cleanHours.value, "value"]} class="w-32" options={options}></NSelect>
        </NSpace>
    }
})