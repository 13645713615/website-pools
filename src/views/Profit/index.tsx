/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-10 14:26:46
 * @LastEditTime: 2022-04-18 17:47:05
 */

import Container from "@/layout/Container";
import { defineComponent } from "vue";
import Table from "./layout/Table";


export default defineComponent({
    name: "Profit",
    render() {
        return (
            <Container class="px-0 md:px-4">
                <Table></Table>
            </Container>
        )
    }
})