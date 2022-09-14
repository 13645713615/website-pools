/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-09-14 10:42:06
 * @LastEditTime: 2022-09-14 16:39:29
 */

import Container from "@/layout/Container";
import { mergeTime } from "@/service/api";
import { CountdownProps, NCountdown } from "naive-ui";

import { defineComponent, ref } from "vue";



export default defineComponent({
    name: "CountDown",
    setup() {

        const end = ref<number>(-1);

        mergeTime().then(res => {
            end.value = new Date(res.data).getTime() - new Date().getTime();
        })

        const renderCountdown: CountdownProps['render'] = ({ hours, minutes, seconds }) => {

            const date = {
                seconds: String(seconds).padStart(2, '0').split(""),
                minutes: String(minutes).padStart(2, '0').split(""),
                hours: String(hours % 24).padStart(2, '0').split(""),
                day: parseInt(String(hours / 24)).toString().padStart(2, '0').split("")
            }

            return <div class="flex items-center gap-x-5 justify-center">
                <div class="text-xl space-x-1">
                    <span class="inline-block h-10 leading-10 w-7 rounded bg-[#f3f4f6]">{date.day[0]}</span>
                    <span class="inline-block h-10 leading-10 w-7 rounded bg-[#f3f4f6]">{date.day[1]}</span>
                    <p class="p-0 leading-none text-sm">天</p>
                </div>
                <div class="text-xl space-x-1">
                    <span class="inline-block h-10 leading-10 w-7 rounded bg-[#f3f4f6]">{date.hours[0]}</span>
                    <span class="inline-block h-10 leading-10 w-7 rounded bg-[#f3f4f6]">{date.hours[1]}</span>
                    <p class="p-0 leading-none text-sm">时</p>
                </div>
                <div class="text-xl space-x-1">
                    <span class="inline-block h-10 leading-10 w-7 rounded bg-[#f3f4f6]">{date.minutes[0]}</span>
                    <span class="inline-block h-10 leading-10 w-7 rounded bg-[#f3f4f6]">{date.minutes[1]}</span>
                    <p class="p-0 leading-none text-sm">分</p>
                </div>
                <div class="text-xl space-x-1">
                    <span class="inline-block h-10 leading-10 w-7 rounded bg-[#f3f4f6]">{date.seconds[0]}</span>
                    <span class="inline-block h-10 leading-10 w-7 rounded bg-[#f3f4f6]">{date.seconds[1]}</span>
                    <p class="p-0 leading-none text-sm">秒</p>
                </div>
            </div>
        }

        return () => (
            end.value > 0 && <section class="py-10 text-center bg-white">
                <Container>
                    <b class="text-2xl font-semibold block">ETH2.0预计合并倒计时</b>
                    <p class="max-w-2xl mx-auto">
                        我们将在合并完成后安排帐户余额的发放。为顺利接收已产出的ETH挖矿收益，请您及时确认ETH钱包地址可正常使用，如尚未添加钱包地址请前往帐户进行设置。
                    </p>
                    <NCountdown class="mt-8" render={renderCountdown} duration={end.value}></NCountdown>
                </Container>
            </section>
        )
    }
})