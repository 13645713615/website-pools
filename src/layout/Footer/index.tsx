/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-27 15:53:19
 * @LastEditTime: 2022-03-27 11:40:23
 */

import Container from '@/layout/Container';
import { useApp } from '@/store';
import { NLayoutFooter } from 'naive-ui';
import { computed, CSSProperties, defineComponent } from "vue";


export default defineComponent({
    name: "Footer",
    setup() {
        const { $state } = useApp();
        return {
            theme: computed<CSSProperties>(() => {
                const backgroundColor = $state.footerBgColor
                return {
                    backgroundColor: backgroundColor === "white" ? backgroundColor : "#313437",
                    color: backgroundColor === "white" ? "black" : "white"
                }
            })
        }
    },
    render() {
        return (
            <NLayoutFooter style={this.theme}>
                <Container class="pt-10 pb-3">
                    <p class="text-center">© 2022 lhpool.com 或附属机构。保留所有权利。</p>
                </Container>
            </NLayoutFooter>
        )

    }
})