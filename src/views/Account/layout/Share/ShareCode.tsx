/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-04-15 16:16:31
 * @LastEditTime: 2022-04-17 15:33:19
 */

import Modal from "@/components/Modal"
import { throttle } from "@/utils/tools"
import { computed, defineComponent, ref } from "vue"
import { modalFormEmiter, Share } from "./emiter"
import QrcodeVue from 'qrcode.vue'
import { NButton, NInput, NInputGroup, NSkeleton, useMessage } from "naive-ui"
import useClipboard from 'vue-clipboard3'
import { useI18n } from "vue-i18n"


export const ShareModal = defineComponent({
    name: "ShareModal",
    setup() {
        const { toClipboard } = useClipboard()
        const { t } = useI18n();
        const message = useMessage()
        const butRefs = ref(null)
        const qrcodeRefs = ref(null);
        const visible = ref<boolean>(false);
        const link = ref<string>(null);
        const path = computed(() => `${location.origin}/share/${link.value}`)
        modalFormEmiter.on(Share.ShareModalOpen).subscribe((value: string) => {
            visible.value = true;
            link.value = value
        })

        function handleCopy(e: Event) {
            e.stopPropagation();
            toClipboard(path.value, butRefs.value?.$el).then(() => {
                message.success("Copy to clipboard successfully！")
            })
        }

        return () => (
            <Modal contextClass="max-w-xl" v-model={[visible.value, "visible"]} title={t("title.share")}>
                <div class="w-screen p-6 max-w-xl m-auto">
                    <div class="text-center">
                        {
                            link.value ?
                                <QrcodeVue ref={(refs) => qrcodeRefs.value = refs} value={path.value} size={150} ></QrcodeVue>
                                :
                                <NSkeleton class="mx-auto" height={150} width={150}></NSkeleton>
                        }
                    </div>
                    <NInputGroup class="mt-9">
                        {
                            link.value ?
                                <>
                                    <NInput class=" !bg-gray-200" size="large" value={path.value} readonly></NInput>
                                    <NButton type="success" ref={(refs) => butRefs.value = refs} size="large" class=" md:w-32" onClick={handleCopy}>Copy</NButton>
                                </>
                                :
                                <NSkeleton height={50} width="100%"></NSkeleton>
                        }
                    </NInputGroup>
                </div>
            </Modal>

        )
    }
})

export const useOpenShare = throttle((data: string) => {
    modalFormEmiter.emit(Share.ShareModalOpen, data)
}, 500)

