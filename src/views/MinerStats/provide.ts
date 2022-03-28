/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 10:06:33
 * @LastEditTime: 2022-03-27 09:32:26
 */


import { ComputedRef, InjectionKey } from 'vue';

export const ProvideWorker: InjectionKey<ComputedRef<string>> = Symbol('ProvideWorker');



