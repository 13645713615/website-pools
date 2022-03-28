/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-27 15:50:37
 * @LastEditTime: 2022-03-02 16:10:31
 */

import { NLayoutContent } from 'naive-ui';
import { defineComponent } from "vue";
import { RouterView } from "vue-router";

export default defineComponent({
    render() {
        return (
            <NLayoutContent >
                <RouterView></RouterView>
            </NLayoutContent>
        )
    }
})