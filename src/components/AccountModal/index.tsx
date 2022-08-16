/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-05-18 16:48:47
 * @LastEditTime: 2022-08-16 12:05:22
 */

import { useEmiter, useModel } from "@/hooks";
import { useUser } from "@/store";
import { UsersAccount, UserState } from "@/store/global/user";
import { debounce, objectToArray } from "@/utils/tools";
import { Search } from "@vicons/ionicons5";
import { NIcon, NInput, NList, NListItem, NScrollbar, NSelect } from "naive-ui";
import { Subscription } from "rxjs";
import { computed, defineComponent, onActivated, onDeactivated, onMounted, onUnmounted, PropType, ref, toRef, watch, watchEffect } from "vue";
import { useI18n } from "vue-i18n";
import Modal from "../Modal";


const modalFormEmiter = useEmiter<"AccountModal">()
type AccountModalProps = {
    alone?: boolean,
    onSelect?: (_value: string) => void,
    extra?: UserState["usersAccount"]
}
export const AccountModal = defineComponent({
    name: "AccountModal",
    emits: {
        select: (_value: string) => true
    },
    setup(_, { emit }) {
        const { t } = useI18n()

        const userStore = useUser();

        const props = ref<null | AccountModalProps>()

        const model = useModel(() => userStore.getAccount, (value) => !props.value?.alone && userStore.setAccount(value))

        const visible = ref<boolean>(false);

        let subscribe: Subscription = null;

        const search = ref<string>(null);

        const items = computed<Array<UsersAccount & { key: string }>>(() => {
            let value = objectToArray(userStore.usersAccount, (value, key) => ({ ...value, key }))
            if (search.value) {
                value = value.filter((item) => ~item.key.indexOf(search.value))
            }
            return value.sort((a, b) => a.key.localeCompare(b.key));
        })

        function onSubscribe() {
            if (!subscribe) {
                subscribe = modalFormEmiter.on("AccountModal").subscribe((options?: AccountModalProps) => {
                    props.value = options;
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
            props.value?.onSelect(value);
            visible.value = false;
        }

        const handleSearch = debounce((value: string) => {
            search.value = value;
        }, 500)


        const activate = "text-[#005adb]"

        function BuildItem(item, key) {
            return (
                <NListItem key={key} class="hover:bg-[#2e333821] cursor-pointer">
                    <a onClick={handleSelect.bind(null, key)} class={`flex !justify-between px-2  ${model.value === key ? activate : ''}`}>
                        <span class="text-base truncate">{item.name}</span>
                        <span class="text-gray-500 truncate">{item.remarkName}</span>
                    </a>
                </NListItem>
            )
        }

        return () => (
            <Modal contextClass="!max-w-xl" v-model={[visible.value, "visible"]} title={t("title.slelctAccount")}>
                <div class="md:h-96 overflow-y-auto relative">
                    <div class="sticky top-0 px-4 py-2">
                        <NInput type="text" placeholder="搜索" onUpdateValue={handleSearch} v-slots={{ prefix: () => <NIcon component={Search}></NIcon> }}></NInput>
                    </div>
                    <NList class="px-4 my-0">
                        {
                            props.value.extra && props.value.alone && objectToArray(props.value.extra, BuildItem)
                        }
                        {
                            items.value.map((item) => BuildItem(item, item.key))
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
        all: {
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
            modalFormEmiter.emit("AccountModal", { alone: props.alone, onSelect: handleSelect, extra: props.all ? { "": { name: "全部" } } : undefined });
        }

        function handleSelect(value: string) {
            model.value = value;
        }

        return () => (
            <>
                <NSelect placeholder="子账户" show={false} value={model.value || (props.all ? "全部" : '')}   {...{ ...attrs, onClick: handleClick }} />
                {
                    props.modal && <AccountModal />
                }
            </>
        )
    }
})


