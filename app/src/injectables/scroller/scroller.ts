import {async, Document, IObject, register, Utils, web} from 'platypus';

export default class Scroller {
    private bodyScrollSelector = '.body';
    constructor(private document: Document, private utils: Utils, private browser: web.Browser, private Promise: async.IPromise) { }

    determineScroll(selector: string): HTMLElement {
        let doc = this.document;
        let scroller: HTMLElement = <HTMLElement>doc.querySelector(selector);

        if (!this.utils.isNode(scroller)) {
            scroller = <HTMLElement>doc.querySelector(this.bodyScrollSelector);
        }

        return scroller;
    }

    pageLoadScroll(offsetSelector: string, scrollerSelector?: string): void;
    pageLoadScroll(offsetSelector: HTMLElement, scrollerSelector?: string): void;
    pageLoadScroll(offsetSelector: any, scrollerSelector: string = this.bodyScrollSelector): void {
        let anchor = this.browser.urlUtils().hash;

        if (this.utils.isEmpty(anchor)) {
            this.scroll(offsetSelector, scrollerSelector);
            return;
        }
    }

    scroll(offsetSelector: string, scrollerSelector?: string): void;
    scroll(offsetSelector: HTMLElement, scrollerSelector?: string): void;
    scroll(offsetSelector: any, scrollerSelector: string = this.bodyScrollSelector): void {
        let utils = this.utils,
            isNode = utils.isNode,
            doc = this.document;

        if (!isNode(offsetSelector) && utils.isEmpty(offsetSelector)) {
            return;
        }

        this.select(offsetSelector).then((el) => {
            let scroller: HTMLElement = <HTMLElement>doc.querySelector(scrollerSelector);

            if (!isNode(scroller) || (utils.isFunction(scroller.contains) && !scroller.contains(el))) {
                return;
            }

            let offset = this.offsetTop(el, scroller) - scroller.offsetTop;

            if (offset < 0) {
                offset = 0;
            }

            if (offset < scroller.scrollTop) {
                scroller.scrollTop = offset;
            }
        });
    }

    protected offsetTop(child: HTMLElement, parent: HTMLElement): number {
        let offset = 0;

        while (child !== parent && child.offsetParent) {
            offset += child.offsetTop;
            child = <HTMLElement>child.offsetParent;
        }

        return offset;
    }

    protected select(anchor: string, isSelector?: boolean): async.IThenable<HTMLElement>;
    protected select(anchor: HTMLElement, isSelector?: boolean): async.IThenable<HTMLElement>;
    protected select(anchor: any, isSelector = false): async.IThenable<HTMLElement> {
        if (this.utils.isNode(anchor)) {
            return this.Promise.resolve(anchor);
        }

        return new this.Promise((resolve, reject) => {
            let d = this.document,
                utils = this.utils,
                isNode = utils.isNode,
                intervalCount = 0,
                selector = anchor;

            if (!isSelector) {
                selector = `[data-anchor="${anchor}"]`;
            }

            let el = d.querySelector(selector);

            if (isNode(el)) {
                resolve(el);
                return;
            }

            el = d.getElementById(anchor);

            if (isNode(el)) {
                resolve(el);
                return;
            }

            let removeInterval = utils.setInterval(() => {
                if (intervalCount++ >= 80) {
                    removeInterval();
                }

                el = d.querySelector(`[data-anchor="${anchor}"]`);

                if (!isNode(el)) {
                    el = d.getElementById(anchor);
                }

                if (!isNode(el)) {
                    return;
                }

                resolve(el);
            }, 100);
        });
    }
}

register.injectable('scroller', Scroller, [
    Document,
    Utils,
    web.Browser,
    async.IPromise
]);
