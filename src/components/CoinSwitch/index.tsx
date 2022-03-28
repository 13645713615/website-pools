/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-05 09:38:31
 * @LastEditTime: 2022-03-26 14:50:21
 */

import { useApp } from "@/store";
import { storeToRefs } from "pinia";
import { Component, computed, defineComponent, PropType } from "vue";

interface Option {
    value: string,
    src: string
}

export default defineComponent({
    name: "CoinSwitch",
    props: {
        size: {
            type: String as PropType<'medium' | 'large'>,
            default: "medium"
        },
        onChange: Function as PropType<(input: string) => void>
    },
    emits: {
        "change": (_: string) => true
    },
    setup(props, content) {
        const { getSupportCoin, coin } = storeToRefs(useApp())
        function handleInput(event) {
            coin.value = event.target.value;
            content.emit("change", coin.value)
        }
        function createWrapper({ value, src }: Option): Component {
            const checked = coin.value == value;
            return (
                <label key={value} class={"coin-switch-wrapper" + (checked ? " coin-switch--checked" : "")}>
                    <img src={src} alt={value} />
                    <input type="radio" name="coin-switch-radio" checked={checked} onInput={handleInput} value={value} />
                </label>
            )
        }
        return {
            coin,
            type: computed(() => ` coin-switch--${props.size}-type`),
            OptionComponent: computed<Component[]>(() => {
                const components: Component[] = [];
                getSupportCoin.value.forEach((src, value) => {
                    components.push(createWrapper({ value, src }))
                })
                return components
            })
        }
    },
    render() {
        return (
            <fieldset class={"coin-switch" + this.type}>
                {this.OptionComponent}
                {this.coin && <div class="coin-switch-wrapper min-w-5"> <span>{this.coin}</span> </div>}
            </fieldset>

        )
    }
})