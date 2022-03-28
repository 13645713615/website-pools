/*
 * @Descripttion: 
 * @version: 
 * @Author: Carroll
 * @Date: 2022-03-01 09:42:19
 * @LastEditTime: 2022-03-02 21:12:53
 */

import { Emiter } from "@/object/Emiter";
import { debounce } from "@/utils/tools";

const enum Container {
    SM = "SM",
    MD = "MD",
    LG = "LG",
    XL = "XL",
    XXL = "XXL"
}

// type TContainer = keyof typeof Container;
type TScreenInfo = { clientWidth: number, container: Container[], screen: Container }


/**
 * @name: 事件响应
 * @msg: 
 * @param {Container} container
 * @param {function} callback
 * @param {boolean} immediate
 * @return {*}
 */
function useSubscribeResize(container: Container[], callback: (args: TScreenInfo) => void, immediate?: boolean): void {
    const resize = Resize.getInstance();
    const fn = callback.bind(callback);
    if (immediate && resize.includes(container)) fn(resize.screenInfo());
    resize.on<TScreenInfo>(container).subscribe(fn);
}

/**
 * @name: 监听
 * @msg: 
 * @param {Container} container
 * @param {function} callback
 * @return {*}
 */
function useResizeWatch(container: Container[], callback: (is: boolean, screenInfo: TScreenInfo) => void, immediate?: boolean) {
    const resize = Resize.getInstance();
    if (immediate) callback(container.includes(resize.container[0]), resize.screenInfo());
    resize.onResize().subscribe((screenInfo) => callback(container.includes(resize.container[0]), screenInfo))
}

class Resize extends Emiter<Container> {

    private static instance: Resize;

    public container: Container[] = [];

    private resizeEmiter: Emiter<"resize">;

    private constructor() {
        super();
        this.resizeEmiter = new Emiter<"resize">();
        this.change();
        window.addEventListener("resize", debounce(this.change.bind(this), 500));
    }

    public static getInstance() {
        if (!Resize.instance) {
            Resize.instance = new Resize();
        }
        return Resize.instance;
    }

    public screenInfo(): TScreenInfo {
        return {
            clientWidth: document.body.clientWidth,
            container: this.container,
            screen: this.container[0]
        }
    }

    public includes(container: Container[]): boolean {
        return this.container.some((value) => container.includes(value))
    }

    private change() {
        const clientWidth = document.body.clientWidth;
        let container: Container[] = [];
        if (clientWidth < 640) container.push(Container.SM);
        if (clientWidth < 768) container.push(Container.MD);
        if (clientWidth < 1024) container.push(Container.LG);
        if (clientWidth < 1280) container.push(Container.XL);
        container.push(Container.XXL);
        const isChange = container[0] != this.container[0];
        this.container = container;
        if (isChange) {
            const screenInfo: TScreenInfo = { clientWidth, container: container, screen: container[0] }
            this.emit(container[0], screenInfo);
            this.resizeEmiter.emit("resize", screenInfo)
        }
    }

    public onResize() {
        return this.resizeEmiter.on<TScreenInfo>("resize")
    }
}

/**
 * @name: 注册
 * @msg: 
 * @param {*}
 * @return {*}
 */
function registeRsize() {
    return Resize.getInstance();
}

export { useResizeWatch, useSubscribeResize, Container, registeRsize }