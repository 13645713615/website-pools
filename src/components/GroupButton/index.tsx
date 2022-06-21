
/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-06-21 16:05:03
 * @LastEditTime: 2022-06-21 16:21:14
 */
import { useModel } from "@/hooks";
import { toArrary } from "@/utils/tools";
import { defineComponent, h, RendererElement } from "vue";
export default defineComponent({
    name: "GroupButton",
    props: {
        value: String
    },
    emits: {
        "update:value": (_value: string) => true,
        "select": (_value: string) => true,
    },
    setup(props, { slots, emit }) {

        const model = useModel(() => props.value, emit.bind(null, "onUpdateModelValue"));

        const handle = {
            onSelect: (key: string) => {
                model.value = key;
                emit("select", key);
            }
        }

        const render = {
            nodeChild: (item: RendererElement) => h(item, { type: model.value == item.key ? "primary" : "default", onClick: handle.onSelect.bind(null, item.key) })
        }


        return () => (
            <div>
                {
                    slots.default && toArrary(slots.default()).map(render.nodeChild)
                }
            </div>
        )
    }
})