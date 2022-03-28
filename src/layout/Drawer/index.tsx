/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-02 16:15:55
 * @LastEditTime: 2022-03-09 17:29:54
 */


import { NButton, NDrawer, NDrawerContent, NIcon } from "naive-ui";
import { computed, DefineComponent, defineComponent, onMounted, PropType, renderSlot, watch } from "vue";
import { Menu, Close } from "@vicons/ionicons5"
import { useApp } from "@/store";
import { useRoute } from "vue-router";

export default defineComponent({
    name: "Drawer",
    props: {
        to: String
    },
    setup() {
        const { $state, setCollapsed } = useApp();
        const route = useRoute();
        function handleClose(value) {
            setCollapsed(value)
        }
        onMounted(() => watch(route, () => handleClose(false)))
        return {
            collapsed: computed<boolean>(() => $state.collapsed),
            handleClose
        }
    },
    render() {
        return (
            <NDrawer width={300} placement="right" zIndex={999} onUpdate:show={this.handleClose} show={this.collapsed}>
                <NDrawerContent>{renderSlot(this.$slots, "default")}</NDrawerContent>
            </NDrawer>
        )
    }
})

export const OpenDrawerBut = defineComponent({
    name: "OpenDrawerBut",
    props: {
        size: String as PropType<'tiny' | 'small' | 'medium' | 'large'>
    },
    setup() {
        const { $state, setCollapsed } = useApp()
        return {
            IconCom: computed<DefineComponent<any, any, any>>(() => $state.collapsed ? Close : Menu),
            handleClick() {
                setCollapsed(!$state.collapsed)
            }
        }
    },
    render() {
        return (
            <NButton quaternary size={this.size} onClick={this.handleClick} v-slots={{ icon: () => <NIcon component={this.IconCom} /> }}></NButton>
        )
    }
})