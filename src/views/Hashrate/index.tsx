/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-06-20 17:00:28
 * @LastEditTime: 2022-06-21 17:54:36
 */

import { useService } from "@/hooks";
import { userCalculatingPower } from "@/service/api";
import { forEach } from "@/utils/tools";
import { NCard, NCollapse, NCollapseItem } from "naive-ui";
import { defineComponent } from "vue";
import BodyAccount from "./layout/BodyAccount";
import HeaderCion from "./layout/HeaderCion";

export default defineComponent({
    name: "Hashrate",
    setup() {
        const service = useService<Record<string, any>>(userCalculatingPower, { defaultValue: {}, immediate: true })

        return () => (
            <div>
                <div class="mt-6 space-y-1">
                    {
                        Object.values(forEach(service.data, (key, value) => (
                            <NCard key={key} class="p-0" content-style={{ padding: "12px" }}>
                                <NCollapse accordion>
                                    <NCollapseItem name={key} v-slots={{ header: () => <HeaderCion coin={key} data={value}></HeaderCion> }}>
                                        <BodyAccount cion={key} data={value}> </BodyAccount>
                                    </NCollapseItem>
                                </NCollapse>
                            </NCard>
                        )))
                    }
                </div>
            </div>
        )
    }
})