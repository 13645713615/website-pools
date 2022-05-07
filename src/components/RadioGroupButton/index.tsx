/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-04-20 12:08:17
 * @LastEditTime: 2022-04-20 14:41:14
 */

import { Container, useResizeWatch } from "@/hooks";
import { ButtonProps, NButton, NButtonGroup, NDropdown } from "naive-ui";
import { computed, defineComponent, PropType, ref, VNodeChild } from "vue";

export interface RadioGroupButtonOption {
    key: number | string;
    label: string;
    [s: string]: any
}

export default defineComponent({
    name: "RadioGroupButton",
    props: {
        options: {
            type: Array as PropType<RadioGroupButtonOption[]>,
            required: true
        },
        value: [String, Number]
    },
    emits: {
        "update:value": (_value: number | string) => true,
        "change": (_value: number | string) => true,

    },
    setup(props, { emit }) {

        const small = ref<boolean>(false);

        const Buttons = computed<VNodeChild>(() => {
            return small.value ? renderButton(props.options[0]) : props.options.map((item) => renderButton(item))
        })

        const methods = {
            renderDropdownLabel: (option: any) => {
                return renderButton(option, { text: true })
            },
            change: (value: string | number) => {
                emit("update:value", value)
                emit("change", value)
            }
        }

        const handle = {
            onclick: (option: RadioGroupButtonOption) => {
                methods.change(option.key)
                return
            }
        }

        useResizeWatch([Container.SM], (is) => {
            small.value = is
        }, true)

        function renderButton(option: RadioGroupButtonOption, butProps?: ButtonProps): VNodeChild {
            return <NButton {...butProps} type={props.value === option.key ? 'primary' : 'default'} key={option.key} onClick={handle.onclick.bind(null, option)}>{option.label}</NButton>
        }

        return () => {
            const [, ...dropdownOptions] = props.options
            const type = dropdownOptions.some((item) => item.key === props.value) ? 'primary' : 'default'

            return (
                <NButtonGroup>
                    {Buttons.value}
                    {small.value &&
                        <NDropdown options={dropdownOptions} renderLabel={methods.renderDropdownLabel}>
                            <NButton type={type}>...</NButton>
                        </NDropdown>
                    }
                </NButtonGroup>
            )
        }
    }
})