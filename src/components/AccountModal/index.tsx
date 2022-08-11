/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-05-18 16:48:47
 * @LastEditTime: 2022-08-11 15:02:27
 */

import { useEmiter, useModel } from "@/hooks";
import { useUser } from "@/store";
import { objectToArray } from "@/utils/tools";
import { NList, NListItem, NSelect } from "naive-ui";
import { Subscription } from "rxjs";
import { defineComponent, onActivated, onDeactivated, onMounted, onUnmounted, PropType, ref, toRef, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import Modal from "../Modal";


const modalFormEmiter = useEmiter<"AccountModal">()
type AccountModalProps = {
    alone?: boolean, onSelect?: (_value: string) => void
}
export const AccountModal = defineComponent({
    name: "AccountModal",
    emits: {
        select: (_value: string) => true
    },
    setup(_, { emit }) {
        const { t } = useI18n()

        const userStore = useUser();

        let props: null | AccountModalProps;

        const model = useModel(() => userStore.getAccount, (value) => !props?.alone && userStore.setAccount(value))

        const visible = ref<boolean>(false);

        let subscribe: Subscription = null;

        function onSubscribe() {
            if (!subscribe) {
                subscribe = modalFormEmiter.on("AccountModal").subscribe((options?: AccountModalProps) => {
                    props = options;
                    visible.value = true
                })
            }
        }
        function unSubscribe() {
            subscribe?.unsubscribe();
            subscribe = null;
        }

        onActivated(onSubscribe);
        onMounted(onSubscribe);
        onDeactivated(unSubscribe);
        onUnmounted(unSubscribe);

        function handleSelect(value: string) {
            model.value = value;
            emit("select", value);
            props?.onSelect(value);
            visible.value = false;
        }
        const activate = "text-[#005adb]"
        function BuildItem(item, key) {
            return (
                <NListItem class="hover:bg-[#2e333821] cursor-pointer">
                    <a onClick={handleSelect.bind(null, key)} class={`flex !justify-between px-2  ${model.value === key ? activate : ''}`}>
                        <span class="text-base truncate">{key}</span>
                        <span class="text-gray-500 truncate">{item.remarkName}</span>
                    </a>
                </NListItem>
            )
        }

        return () => (
            <Modal contextClass="!max-w-xl" v-model={[visible.value, "visible"]} title={t("title.slelctAccount")}>
                <div class="md:h-96 overflow-y-auto">
                    <NList class="px-4">
                        {
                            objectToArray(userStore.usersAccount, BuildItem)
                        }
                    </NList>
                </div>
            </Modal>
        )
    }
})


export const AccountModalOpenBtn = defineComponent({
    name: "AccountModalOpenBtn",
    inheritAttrs: false,
    props: {
        modal: {
            type: Boolean,
            default: true,
        },
        alone: {
            type: Boolean,
        },
        clearable: {
            type: Boolean
        }
    },
    emits: {
        change: (_value: string) => true
    },
    setup(props, { attrs, emit }) {

        const userStore = useUser();

        const model = useModel(() => userStore.getAccount, (value) => emit("change", value))

        function handleClick(e: Event) {
            e.stopPropagation();
            modalFormEmiter.emit("AccountModal", { alone: props.alone, onSelect: handleSelect });
        }

        function handleSelect(value: string) {
            console.log(value);
            model.value = value;
        }

        function handleClear() {
            model.value = "";
        }

        return () => (
            <>
                <NSelect placeholder="子账户" show={false} value={model.value} clearable={props.clearable} onClear={handleClear}  {...{ ...attrs, onClick: handleClick }} />
                {
                    props.modal && <AccountModal />
                }
            </>
        )
    }
})


