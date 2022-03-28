/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-28 22:05:57
 * @LastEditTime: 2022-03-07 09:30:11
 */

import { useResizeWatch, Container } from "@/hooks/resize";
import { defineComponent, PropType, ref, renderSlot } from "vue";

type Containers = keyof typeof Container;
const largeScreen: Array<Containers> = ["XL", "XXL"];
const smallScreen: Array<Containers> = ["LG", "SM", "MD"];
export default defineComponent({
    name: "Screen",
    props: {
        include: {
            type: Array as PropType<Containers[]>,
            default: () => []
        },
        exclude: {
            type: Array as PropType<Containers[]>,
            default: () => []
        },
        size: String as PropType<"large" | "small">
    },
    setup(props, ctx) {
        const is = ref<boolean>(false);
        let container = props.include.length ? props.include : props.exclude;
        if (props.size) container = props.size === "large" ? largeScreen : smallScreen;
        if (container.length) {
            useResizeWatch(container as Container[], (bol) => {
                is.value = bol;
            }, true)
        }
        return () => is.value ? renderSlot(ctx.slots, "default") : renderSlot(ctx.slots, "other")
    }
})