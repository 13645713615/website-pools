/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-22 16:43:12
 * @LastEditTime: 2022-03-25 20:35:16
 */

import { useUser } from "@/store";
import { NAffix, NDivider, NDropdown, NLayoutSider, NMenu, NSpace } from "naive-ui";
import { defineComponent, toRef, toRefs } from "vue";
import { useUserMenu } from "../Menu/option";
import Avatar from "vue3-avatar"

export default defineComponent({
    name: "SiderMenu",
    props: {
        value: String
    },
    setup() {
        const options = useUserMenu();
        const { username, email } = toRefs(useUser().userInfo)
        options.pop()
        return {
            options,
            username,
            email
        }
    },
    render() {
        return (
            <NLayoutSider width={220} collapseMode="width">
                <NAffix triggerTop={80} class="w-[220px] pt-8" listenTo={() => document.querySelector(".n-layout-scroll-container")}>
                    <NSpace vertical align="center" justify="center" >
                        <Avatar background="#0069FF" size={64} name={this.username} color="#fff"></Avatar>
                        <strong class="block">{this.username}</strong>
                        <span>{this.email}</span>
                    </NSpace>
                    <NDivider class="mx-4 w-auto"></NDivider>
                    <NMenu value={this.value} options={this.options}></NMenu>
                </NAffix>
            </NLayoutSider>
        )
    }
})