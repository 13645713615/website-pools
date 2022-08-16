/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-06-21 15:44:42
 * @LastEditTime: 2022-08-12 11:58:12
 */

import { AccountModalOpenBtn } from "@/components/AccountModal";
import { debounce } from "@/utils/tools";
import { NDatePicker, NSelect } from "naive-ui";
import { SelectMixedOption } from "naive-ui/es/select/src/interface";
import { computed, defineComponent, PropType, ref, watchEffect } from "vue";
import { useI18n } from "vue-i18n";

export interface FilterParams {
    coin: string,
    dateStart?: string,
    dateEnd?: string,
    type: string,
    accountName?: string
}

export default defineComponent({
    name: "Filter",
    props: {
        coins: Array as PropType<string[]>
    },
    emits: {
        change: (_value: FilterParams) => true
    },
    setup(props, { emit }) {

        const { t } = useI18n()

        const range = ref<[string, string]>();

        const type = ref<string>("1");

        const coin = ref<string>("all");

        const accountName = ref<string>();

        const typeOptions: SelectMixedOption[] = [{
            value: "1",
            label: t("title.totalDailyIncome")
        }, {
            value: "2",
            label: t("title.dailyAccountEarnings")
        }]

        const coinOptions = computed<SelectMixedOption[]>(() => {
            return [
                {
                    value: "all",
                    label: "全部"
                },
                ...(props.coins?.map((coin) => ({ value: coin, label: coin })) || [])
            ]
        })

        const handle = {
            onChange: (value: string) => {
                accountName.value = value;
            }
        }

        const methods = {
            change: debounce((value: FilterParams) => emit("change", value), 500)
        }

        watchEffect(() => {
            methods.change({ accountName: accountName.value, coin: coin.value.toLocaleLowerCase(), type: type.value, dateStart: range.value?.[0], dateEnd: range.value?.[1] })
        });

        return () => (
            <div class="flex flex-wrap gap-3 items-center">
                <NDatePicker class="max-w-xs" value-format="yyyy-MM-dd" v-model={[range.value, "formattedValue"]} type="daterange" clearable></NDatePicker>
                <NSelect class="max-w-10" v-model={[type.value, "value"]} options={typeOptions}></NSelect>
                <NSelect class="max-w-10" v-model={[coin.value, "value"]} options={coinOptions.value}></NSelect>
                {
                    type.value == "2" &&
                    <AccountModalOpenBtn all alone modal={false} class="w-32" onChange={handle.onChange}></AccountModalOpenBtn>
                }
            </div>
        )
    }
})