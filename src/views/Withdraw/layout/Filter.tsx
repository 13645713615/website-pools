/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-07-18 15:59:22
 * @LastEditTime: 2022-07-18 16:52:25
 */

import { AccountModalOpenBtn } from "@/components/AccountModal";
import { useApp, useUser } from "@/store";
import { NAvatar, NSelect, NSpace } from "naive-ui";
import { SelectBaseOption, SelectMixedOption } from "naive-ui/es/select/src/interface";
import { computed, defineComponent } from "vue";

export default defineComponent({
    name: "Filter",
    setup() {

        const userStore = useUser();

        const { getCoinPictures } = useApp()

        const coin = computed<string>({
            get() {
                return userStore.getCoin || ""
            },
            set(value) {
                userStore.setCoin(value)
            }
        })

        const coinOptions = computed<SelectMixedOption[]>(() => {
            return userStore.getUserCoins.map(methods.createOptions)
        })

        const methods = {
            createOptions: (coin): SelectMixedOption => {
                return {
                    value: coin,
                    label: coin
                }
            },
            renderLabel: (option: SelectBaseOption) => {
                const value = option.label.toString().toUpperCase();
                return (
                    <div class="flex items-center">
                        <NAvatar size="small" src={getCoinPictures.get(value)} round ></NAvatar>
                        <div class="ml-3 px-1">
                            {value}
                        </div>
                    </div>
                )
            }
        }

        return () => (
            <>
                <AccountModalOpenBtn class="w-32"></AccountModalOpenBtn>
                <NSelect class="w-32" v-model={[coin.value, "value"]} renderLabel={methods.renderLabel} options={coinOptions.value}></NSelect>
            </>
        )
    }
})