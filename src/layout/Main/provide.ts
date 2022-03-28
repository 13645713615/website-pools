/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 10:06:33
 * @LastEditTime: 2022-03-27 11:59:49
 */


import { InjectionKey } from 'vue';

export const ProvideScrollTo: InjectionKey<(options: ScrollToOptions) => void> = Symbol('ProvideScrollTo');



