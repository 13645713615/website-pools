/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-22 17:39:50
 * @LastEditTime: 2022-05-03 12:39:31
 */

import ModalForm, { AlertProps } from "@/components/ModalForm";
import { useEmiter } from "@/hooks";
import { useApp } from "@/store";
import { throttle } from "@/utils/tools";
import { CreateOutline, PersonAddOutline } from "@vicons/ionicons5";
import { FormRules, NButton, NFormItem, NIcon, NInput, NSelect } from "naive-ui";
import { SelectMixedOption } from "naive-ui/lib/select/src/interface";
import { computed, defineComponent, PropType, reactive, ref, toRefs } from "vue";
import { useI18n } from "vue-i18n";
import Collect from "../Collect";
import { Columns } from "../Table/option";
import { collection, createOptions } from "./utils";
enum SetFollow {
    Create,
    Update
}
const modalFormEmiter = useEmiter<SetFollow>()
const fromData = { collectUrl: "", collectType: 1, collectRemark: "" }
export default defineComponent({
    name: "CreateForm",
    emits: {
        complete: () => true,
    },
    setup(_, { emit }) {
        const { t } = useI18n();
        const { getSupportCoin, supportCoin } = toRefs(useApp())
        const visible = ref<boolean>(false);
        const isCreate = ref<boolean>(true);
        const form = reactive({ ...fromData, coinType: supportCoin.value[0] })

        const options = computed(() => {
            const values: SelectMixedOption[] = [];
            getSupportCoin.value.forEach((label, key) => values.push(createOptions(label, key)))
            return values
        })

        const formRules: FormRules = {
            collectUrl: [
                { required: true, message: t("placeholder.address"), trigger: 'blur' }
            ],
            collectRemark: [
                { required: true, message: t("placeholder.remark"), trigger: 'blur' }
            ]
        }
        modalFormEmiter.on(SetFollow.Create).subscribe((value) => {
            isCreate.value = true;
            visible.value = value
        });

        modalFormEmiter.on(SetFollow.Update).subscribe((data: Columns) => {
            isCreate.value = false;
            Object.assign(form, data, { coinType: data.coinType });
            visible.value = true;
        });


        function handleSubmit(next: (props: AlertProps) => void) {
            collection(form, form.collectType).then(() => {
                next({ visible: false })
                Object.assign(form, fromData, { id: undefined })
                emit("complete")
            }).catch(res => {
                next({ visible: true, message: res.message })
            })
        }

        return function () {
            return (
                <ModalForm showLabel model={form} onSubmit={handleSubmit} rules={formRules} size="large" v-model={[visible.value, "visible"]} title={t("title.setFollow")}>
                    {
                        isCreate.value && (
                            <>
                                <NFormItem path="coinType" label={t("form.coin")}>
                                    <NSelect v-model={[form.coinType, "value"]} placeholder={t("form.coin")} options={options.value}></NSelect>
                                </NFormItem>
                                <NFormItem path="collectUrl" label={t("form.address")}>
                                    <NInput v-model={[form.collectUrl, "value"]} placeholder={t("form.address")}></NInput>
                                </NFormItem>
                            </>
                        )
                    }
                    <NFormItem path="collectRemark" label={t("form.remark")}>
                        <NInput v-model={[form.collectRemark, "value"]} placeholder={t("form.remark")}></NInput>
                    </NFormItem>
                </ModalForm>
            )
        }
    }
})


const CreateFormButton = defineComponent({
    name: "CreateForm",
    setup() {
        const { t } = useI18n()
        const handleOpen = throttle(() => {
            modalFormEmiter.emit(SetFollow.Create, true)
        }, 500)
        return function () {
            return (
                <NButton type="primary" class="w-32" v-slots={{ icon: () => <NIcon component={PersonAddOutline} /> }} onClick={handleOpen}>{t("button.addFollow")}</NButton>
            )
        }
    }
})

const EditFormButton = defineComponent({
    name: "SetFollowEditButton",
    props: {
        data: Object as PropType<Columns>
    },
    setup(props) {
        function handleOpen() {
            modalFormEmiter.emit(SetFollow.Update, props.data)
        }
        return function () {
            return (
                <NButton tertiary onClick={handleOpen} circle v-slots={{ icon: () => <NIcon component={CreateOutline} /> }}></NButton>
            )
        }
    }
})

export { CreateFormButton, Collect, EditFormButton }