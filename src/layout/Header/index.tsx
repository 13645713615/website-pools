/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 16:30:22
 * @LastEditTime: 2022-03-13 18:07:47
 */

import { defineComponent, renderSlot } from "vue";
import { NLayoutHeader } from "naive-ui"
import Container from "../Container";
import { RouterLink } from "vue-router";
import logo from "@/assets/images/logo.png";
export default defineComponent({
    name: "Header",
    render() {
        return (
            <NLayoutHeader bordered >
                <Container class="h-16 flex items-center">
                    <RouterLink to={{ path: "/home" }} class="logo text-black">
                        <img src={logo} />
                        <strong>lhpool</strong>
                    </RouterLink>
                    <div class="flex-1">
                        {renderSlot(this.$slots, "default")}
                    </div>
                </Container>
            </NLayoutHeader >
        )
    }
})