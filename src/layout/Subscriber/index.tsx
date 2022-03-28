/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-06 14:18:30
 * @LastEditTime: 2022-03-14 17:54:56
 */

import { defineComponent, renderSlot } from "vue";
import Container from "../Container";
import bg1 from "@/assets/images/bg1.png";
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