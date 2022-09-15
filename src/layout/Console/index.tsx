/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-08 16:12:34
 * @LastEditTime: 2022-09-14 18:30:15
 */


import { NLayout, NLayoutContent } from "naive-ui";
import { computed, DefineComponent, defineComponent, KeepAlive } from "vue";
import { RouteRecordRaw, RouterView, useRoute } from "vue-router";
import Container from "../Container";
import SiderMenu from "../SiderMenu";

export default defineComponent({
    name: "Console",
    setup() {
        const route = useRoute();
        const pageName = computed<string>(() => route.name as string);
        return function () {
            return (
                <Container class="pt-4 pb-9">
                    <NLayout hasSider>
                        <SiderMenu value={pageName.value} class="mr-4 lg:block  hidden"></SiderMenu>
                        <NLayoutContent>
                            <RouterView v-slots={{
                                default: ({ Component, route }: { Component: DefineComponent, route: RouteRecordRaw }) =>
                                // include={["Account"]}
                                //   <KeepAlive >
                                        <Component key={route.name}></Component>
                                    // </KeepAlive>
                            }}></RouterView>
                        </NLayoutContent>
                    </NLayout>
                </Container>
            )
        }
    }
})
