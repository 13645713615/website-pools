/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-15 10:30:54
 * @LastEditTime: 2022-03-22 22:18:55
 */


import { Close } from "@vicons/ionicons5";
import { NButton, NIcon, NLayout, NLayoutContent, NLayoutHeader, NModal } from "naive-ui";
import { defineComponent, PropType, renderSlot, VNodeChild } from "vue";

export default defineComponent({
    name: "Modal",
    props: {
        maskClosable: {
            type: Boolean,
            defaulf: false
        },
        contextClass: String,
        visible: Boolean,
        title: String as PropType<string | VNodeChild>,
        onClose: Function
    },
    emits: {
        "update:visible": (_value: boolean) => true,
        "close": () => true,
    },
    setup(_, context) {
        return {
            handleClose() {
                context.emit("update:visible", false)
                context.emit("close")
            }
        }
    },
    render() {
        return (
            <NModal transformOrigin="center" show={this.visible} onEsc={this.handleClose} maskClosable={this.maskClosable} closable={false}>
                <NLayout class={"max-h-screen w-full md:w-auto max-w-screen-lg bg-white md:h-auto h-screen " + this.contextClass}  >
                    <NLayoutHeader bordered class="md:rounded-t-md h-16 px-6 flex items-center justify-between sticky top-0 z-50">
                        <h2 class="leading-none text-lg">{this.title}</h2>
                        <NButton quaternary onClick={this.handleClose}><NIcon size={25} component={Close}></NIcon></NButton>
                    </NLayoutHeader>
                    <NLayoutContent >
                        {renderSlot(this.$slots, "default")}
                    </NLayoutContent>
                </NLayout>
            </NModal>
        )
    }
})