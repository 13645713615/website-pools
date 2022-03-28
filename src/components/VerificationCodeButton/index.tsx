/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-07 13:50:08
 * @LastEditTime: 2022-03-07 18:33:04
 */

import { NButton } from "naive-ui";
import { computed, defineComponent, PropType, ref } from "vue";
import { useI18n } from "vue-i18n";


export default defineComponent({
    name: "VerificationCodeButton",
    props: {
        tiem: {
            type: Number,
            default: 60
        },
        text: {
            type: String,
            required: true
        },
        onConfirm: Function as PropType<(next: (state: boolean) => void) => void>
    },
    emits: {
        confirm: (next: (state: boolean) => void) => true
    },
    setup(props, context) {
        let frequency = 0;
        let interval = null
        const { t } = useI18n()
        const reacquireText = t('verificationCode.reacquire')
        const text = ref<string>();
        const loading = ref<boolean>(false);
        const count = ref<number>(0);
        const disabled = computed<boolean>(() => !!count.value);

        function proving() {
            if (count.value <= 1) {
                count.value = 0;
                text.value = "";
                clearInterval(interval)
                return
            }

            text.value = `${count.value--}s ${reacquireText}`
        }
        function next(state: boolean = true) {
            loading.value = false;
            if (!state) return;
            count.value = props.tiem;
            text.value = `${count.value--}s ${reacquireText}`
            interval = setInterval(proving, 1000);
        }
        return {
            disabled,
            butText: computed<string>(() => text.value || props.text),
            loading,
            handleClick() {
                if (count.value || loading.value) return;
                frequency++;
                loading.value = true;
                context.emit("confirm", next)
            }
        }
    },
    render() {
        return (
            <NButton onClick={this.handleClick} disabled={this.disabled} loading={this.loading}>{this.butText}</NButton>
        )
    }
})