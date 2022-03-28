/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-07 22:27:53
 * @LastEditTime: 2022-03-08 14:23:07
 */

import { ReloadCircleSharp } from "@vicons/ionicons5"

import { Component, defineComponent, PropType, ref } from "vue"

export default defineComponent({
    name: "Loading",
    props: {
        title: String,
        icon: {
            type: Object as PropType<Component>,
            default: () => {
                return <ReloadCircleSharp />
            }
        },
        color: {
            type: String,
            default: "#217dff"
        }
    },
    setup() {
        const visible = ref<Boolean>(false);
        return {
            visible,
            hide() {
                visible.value = false
            },
            show() {
                visible.value = true
            }
        }
    },
    render() {
        return (
            <div class="loading" style={{ display: this.visible ? "block" : "none" }}>
                <div class="loading-wrapper">
                    <div class="loading-wrapper-icon" style={{ color: this.color }}>
                        <div class="loading-icon">
                            {this.icon}
                        </div>
                    </div>
                    <span class="loading-text">{this.title}</span>
                </div>
            </div>
        )
    }
})