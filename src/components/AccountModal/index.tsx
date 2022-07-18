/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-05-18 16:48:47
 * @LastEditTime: 2022-07-18 15:17:24
 */

import { useEmiter } from "@/hooks";
import { useUser } from "@/store";
import { objectToArray } from "@/utils/tools";
import { NList, NListItem, NSelect } from "naive-ui";
import { Subscription } from "rxjs";
import { defineComponent, onActivated, onDeactivated, onMounted, onUnmounted, PropType, ref, toRef, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import Modal from "../Modal";


const modalFormEmiter = useEmiter<"AccountModal">()

export const AccountModal = defineComponent({
    name: "AccountModal",
    props: {
        onSelect: Function as PropType<(value: string) => void>
    },
    setup(_, { emit }) {
        const { t } = useI18n()

        const userStore = useUser();
        const account = toRef(userStore, "getAccount");

        const visible = ref<boolean>(false);

        let subscribe: Subscription = null;

        function onSubscribe() {
            if (!subscribe) {
                subscribe = modalFormEmiter.on("AccountModal").subscribe(() => {
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
            userStore.setAccount(value);
            emit("select", value);
            visible.value = false;
        }
        const activate = "text-[#005adb]"
        function BuildItem(item, key) {
            return (
                <NListItem class="hover:bg-[#2e333821] cursor-pointer">
                    <a onClick={handleSelect.bind(null, key)} class={`flex !justify-between px-2  ${account.value === key ? activate : ''}`}>
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
        }
    },
    emits: {
        change: (_value: string) => true
    },
    setup(props, { attrs, emit }) {

        const account = toRef(useUser(), "getAccount");

        function handleClick(e: Event) {
            e.stopPropagation();
            modalFormEmiter.emit("AccountModal");
        }

        watchEffect(() => emit("change", account.value))

        return () => (
            <>
                <NSelect show={false} value={account.value}   {...{ ...attrs, onClick: handleClick }} />
                {
                    props.modal && <AccountModal />
                }
            </>
        )
    }
})


