/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-10 14:26:46
 * @LastEditTime: 2022-03-12 09:24:24
 */

import Container from "@/layout/Container";
import { defineComponent } from "vue";
import Table from "./layout/Table";


export default defineComponent({
    name: "Profit",
    render() {
        return (
            <Container>
                <Table></Table>
            </Container>
        )
    }
})