/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-28 18:01:15
 * @LastEditTime: 2022-03-24 14:45:42
 */

import { useUser } from "@/store";
import { ChevronDown, ChevronForward } from "@vicons/ionicons5";
import { NDropdown, NIcon, NSelect, NSpace } from "naive-ui";
import { computed, defineComponent, PropType, ref, renderSlot, VNodeChild } from "vue";

export default defineComponent({
    name: "AccountSelect",
    props: {
        mode: String as PropType<"select" | "dropdown">,
        onSelect: Function as PropType<(value: string) => void>
    },
    emits: {
        select: (_: string) => true
    },
    setup(props, context) {
        const userStore = useUser();
        const show = ref<boolean>(false);
        const value = computed<string>(() => userStore.getAccount);
        const options = computed<Array<{ label: string, value: string, key: string }>>(() => userStore.getUserAccounts?.map(createOptions) || [])
        function handleSelect(value: string) {
            userStore.setAccount(value);
            context.emit("select", value)
        }
        function createOptions(name) {
            const { remarkName } = userStore.usersAccount[name] || {}
            return {
                value: name,
                label: remarkName ? () => (<div><span class="max-w-10 truncate">{name}</span> ({remarkName})</div>) : name,
                key: name
            }
        }
        function Select(): VNodeChild {
            return <NSelect value={value.value} onUpdateValue={handleSelect} options={options.value} />
        }

        function Dropdown(): VNodeChild {
            return (
                <NDropdown v-model={[show.value, "show"]} value={value.value} trigger="click" onSelect={handleSelect} options={options.value}>
                    <NSpace align="center" size="small" class="cursor-pointer hover:text-primary">
                        <NIcon class="align-middle" component={show.value ? ChevronForward : ChevronDown}></NIcon>
                        {renderSlot(context.slots, "default")}
                    </NSpace>
                </NDropdown>
            )

        }

        return props.mode === "dropdown" ? Dropdown : Select
    },
})