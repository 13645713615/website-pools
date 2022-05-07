/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-27 15:50:37
 * @LastEditTime: 2022-04-19 10:41:11
 */

import { NLayoutContent } from 'naive-ui';
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
    render() {
        return (
            <NLayoutContent>
                <RouterView></RouterView>
            </NLayoutContent>
        )
    }
})