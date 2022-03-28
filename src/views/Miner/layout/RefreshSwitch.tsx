/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-10 09:31:57
 * @LastEditTime: 2022-03-17 14:31:46
 */
import { NButton, NCountdown, NSpace, NSwitch } from "naive-ui";
import { defineComponent, PropType, ref } from "vue";

export default defineComponent({
    name: "RefreshSwitch",
    props: {
        onFinish: Function as PropType<() => void>
    },
    emits: {
        finish: () => true
    },
    setup(_props, context) {
        const active = ref<boolean>(false);
        const countdownRefs = ref(null);
        return {
            active,
            countdownRefs,
            renderCountdown({ minutes, seconds }) {
                return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
            },
            handleFinish() {
                active.value = false;
                context.emit("finish");
                setTimeout(() => { active.value = true; }, 1);
            }
        }
    },
    render() {
        return (
            <NSpace align="center" size="large">
                {this.active && <span class="text-lg"><NCountdown ref={(refs) => this.countdownRefs = refs} onFinish={this.handleFinish} render={this.renderCountdown} duration={60000} active></NCountdown></span>}
                <div>
                    <NButton text tag="a" class="text-base align-middle pr-2">{this.$t("button.refresh")}</NButton>
                    <NSwitch v-model={[this.active, "value"]} round={false}></NSwitch>
                </div>
            </NSpace>
        )
    }
})