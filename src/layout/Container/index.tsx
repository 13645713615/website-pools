/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-27 18:13:43
 * @LastEditTime: 2022-04-20 11:45:43
 */

import { defineComponent, PropType, renderSlot } from "vue"
export default defineComponent({
    name: "Container",
    props: {
        size: {
            type: String as PropType<"2xl" | "xl" | "lg" | "md" | "sm">,
            default: "xl"
        }
    },
    computed: {
        maxScreen() {
            switch (this.size) {
                case "2xl":
                    return "max-w-screen-2xl"
                case "md":
                    return "max-w-screen-md"
                case "lg":
                    return "max-w-screen-lg"
                case "sm":
                    return "max-w-screen-sm"
                default:
                    return "max-w-screen-xl"
            }
        }
    },
    render() {
        return (
            <section class={"container mx-auto px-2 md:px-4 " + this.maxScreen}>{renderSlot(this.$slots, "default")}</section>
        )
    }
})