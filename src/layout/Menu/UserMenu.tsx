/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-08 18:19:12
 * @LastEditTime: 2022-03-25 17:32:58
 */
import { NDropdown } from "naive-ui";
import { defineComponent, toRef } from "vue";
import { useUserMenu } from "./option";
import { useUser } from "@/store";
import Avatar from "vue3-avatar";

export default defineComponent({
    name: "UserMenu",
    setup() {
        return {
            options: useUserMenu()
        }
    },
    render() {
        const userInfo = toRef(useUser(), "userInfo")
        return (
            <NDropdown trigger="click" keyboard options={this.options}>
                <Avatar size={40} background="#0069FF" class="cursor-pointer" color="#FFF" name={userInfo.value.username}></Avatar>
            </NDropdown>
        )
    }
})