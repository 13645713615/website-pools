/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-08 16:24:16
 * @LastEditTime: 2022-03-08 16:30:34
 */


import { RouteRecordRedirectOption, RouteComponent, RouteMeta, RouteRecordName, _RouteRecordBase, PathParserOptions, NavigationGuardWithThis } from "vue-router";

export interface IRoute {
    path?: string;
    name?: string;
    meta?: Record<string, any>;
    params?: Record<string, any>;
    query?: Record<string, any>;
    redirect?: RouteRecordRedirectOption;
}


type Lazy<T> = () => Promise<T>;
type RawRouteComponent = RouteComponent | Lazy<RouteComponent>;

export interface IRouteMeta extends RouteMeta {
    noCache?: boolean;
    title: string;
    visitor?: boolean;
}

export interface IRoutes extends PathParserOptions {
    path: string;
    redirect?: RouteRecordRedirectOption;
    children?: TRoutesRaw[];
    alias?: string | string[];
    name?: RouteRecordName;
    meta?: IRouteMeta;
    beforeEnter?: NavigationGuardWithThis<undefined> | NavigationGuardWithThis<undefined>[];
    component?: RawRouteComponent;
}

export type TRoutesRaw = RouteRecordMultipleViews | RouteRecordSingleView | RouteRecordRedirect
export interface TRoutesMenu extends IRoutes {
    component: any;
    children?: any[];
}

interface RouteRecordSingleView extends IRoutes {
    name: RouteRecordName;
    component: RawRouteComponent;
    components?: never;
    props?: never;
}

interface RouteRecordMultipleViews extends IRoutes {
    name: RouteRecordName;
    components: Record<string, RawRouteComponent>;
    component?: never;
    props?: Record<string, never> | boolean;
}

interface RouteRecordRedirect extends IRoutes {
    redirect: RouteRecordRedirectOption;
    component?: never;
    components?: never;
}