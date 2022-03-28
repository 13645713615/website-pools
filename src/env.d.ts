/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-02-26 15:04:53
 * @LastEditTime: 2022-03-19 18:07:26
 */
/// <reference types="vite/client" />

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface Window {
  $message: any
}

interface ImportMetaEnv {
  VITE_APP_BASE: string;
  VITE_APP_BASE_API: string;

  VITE_APP_XNPOOL_LINK: string;
  VITE_APP_PEOXY_TARGET: string;
  VITE_APP_KEEPALIVE_ALIVEMAX: string;
  
  VITE_APP_AGENT_HOST:string;

  VITE_APP_USER_SEARCH_CACHE_MAX:string;

  VITE_APP_IMAGES_BASE:string;
}

type PickAttr<T, K extends keyof T> = T[K];

declare function WeakRef(...args: any): void { }
declare function FinalizationRegistry(...args: any): void { }

