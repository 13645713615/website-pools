/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-22 17:58:33
 * @LastEditTime: 2022-04-15 15:44:02
 */

import { FormInst, FormRules, NAlert, NButton, NForm, NSpace } from "naive-ui";
import { defineComponent, PropType, reactive, ref, renderSlot, VNodeChild } from "vue";
import { useI18n } from "vue-i18n";
import Modal from "../Modal";

export interface AlertProps {
    visible: boolean,
    message?: string
}

export default defineComponent({
    name: "ModalForm",
    props: {
        visible: Boolean,
        title: String as PropType<string | VNodeChild>,
        model: Object,
        rules: Object as PropType<FormRules>,
        onSubmit: Function as PropType<(next: (props: AlertProps) => void) => void>,
        size: String as PropType<'small' | 'medium' | 'large'>,
        onClose: Function,
        notBut: Boolean,
        showLabel: {
            typpe: Boolean,
            default: false
        }
    },
    emits: {
        submit: (_: (props: AlertProps) => void) => true,
        "update:visible": (_value: boolean) => true,
        close: () => true,
    },
    setup(props, context) {
        const { t } = useI18n()
        const loading = ref<boolean>(false)
        const formRef = ref<FormInst | null>(null);
        const alert = reactive<AlertProps>({ visible: false, message: "" });
        function handleClose() {
            context.emit("update:visible", false)
            context.emit("close");
            formRef.value?.restoreValidation();
        }
        function next(value) {
            alert.visible = value.visible;
            alert.message = value.message;
            loading.value = false;
            if (!alert.visible) handleClose();
        }
        function handleSubmit(e: Event) {
            e.preventDefault();
            formRef.value?.validate((errors) => {
                if (!errors) {
                    loading.value = true;
                    context.emit("submit", next)
                }
            })
        }

        return function () {
            return (
                <Modal contextClass="max-w-xl" visible={props.visible} onClose={handleClose} title={props.title}>
                    <div class="w-screen p-6 max-w-xl m-auto ">
                        <NForm size={props.size} showLabel={props.showLabel} ref={(ref) => formRef.value = ref} model={props.model} rules={props.rules} onSubmit={handleSubmit}>
                            {alert.visible && <NAlert class="mb-3" type="error" closable onClose={() => alert.visible = false}>{alert.message}</NAlert>}
                            {renderSlot(context.slots, "default")}
                            {
                                !props.notBut && (
                                    <div class="flex justify-end">
                                        <NButton type="success" class="min-w-full md:min-w-9" size={props.size} loading={loading.value} attrType="submit">{t("button.submit")}</NButton>
                                    </div>
                                )
                            }
                        </NForm>
                    </div>
                </Modal>
            )
        }
    }
})