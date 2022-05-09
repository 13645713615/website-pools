/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-06 14:18:30
 * @LastEditTime: 2022-05-09 15:44:37
 */

import { defineComponent, renderSlot } from "vue";
import Container from "../Container";
import bg1 from "@/assets/images/bg1.jpg";
export default defineComponent({
    name: "Subscriber",
    render() {
        return (
            <div class="pt-12 pb-16 bg-no-repeat bg-cover bg-top " style={{ backgroundImage: `url(${bg1})` }}>
                <Container >
                    {renderSlot(this.$slots, "default")}
                </Container>
            </div>
        )
    }
})