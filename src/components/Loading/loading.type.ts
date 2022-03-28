/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-08 14:30:39
 * @LastEditTime: 2022-03-08 14:33:05
 */

import { Component, ComponentPublicInstance } from "vue";

export interface LoadingProps {
    title?: string;
    icon?: Component;
    color?: string;
}

export type LoadingsMethod = {
    show: () => void;
    hide: () => void;
}

export type LoadingComponentInstance = ComponentPublicInstance<LoadingProps, {}, {}, {}, LoadingsMethod>
