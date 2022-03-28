/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-11 10:06:33
 * @LastEditTime: 2022-03-27 11:02:28
 */

import { Observable } from 'rxjs';
import { ComputedRef, InjectionKey } from 'vue';

export interface PaneData {
    online: number,
    offline: number,
    blanace: string,
    blanace_RMB: string,
    ppsReward: string,
    ppsReward_RMB: string,
    speed: string,
    speed24h: string,
    scale: string,
    localspeed: string,
    localspeed24h: string,
    speed24hcount: number,
    speed24hinvalidcount: number,
    speed24hstalecount: number,
}

export const ProvidePaneData: InjectionKey<ComputedRef<PaneData>> = Symbol('ProvidePaneData');
export const ProvideWalletInfo: InjectionKey<ComputedRef<{ coin: string, wallet: string, token: string }>> = Symbol('ProvideWalletInfo');
export const ProvideLoad: InjectionKey<<T>() => Observable<T>> = Symbol('ProvideLoad');


