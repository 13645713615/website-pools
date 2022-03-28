/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-08 16:12:34
 * @LastEditTime: 2022-03-25 09:11:02
 */


import { NLayout } from "naive-ui";
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import Container from "../Container";
import Content from "../Content";
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
                        <Content></Content>
                    </NLayout>
                </Container>
            )
        }
    }
})
