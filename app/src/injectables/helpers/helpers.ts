import {register, routing, Utils, web} from 'platypus';

export default class Helpers {
    protected static _inject: any = {
        browser: web.Browser,
        utils: Utils
    };

    protected browser: web.Browser;
    protected utils: Utils;

    selectRoute(links: Array<ILink>, utils?: web.UrlUtils): void {
        let router = routing.Router.currentRouter(),
            routes: Array<string> = this.utils.map((link) => {
                if (link.isUrl) {
                    return link.view;
                }

                return router.generate(link.view);
            }, links),
            selectedIndex = -1;

        if (!this.utils.isObject(utils)) {
            utils = this.browser.urlUtils();
        }

        let path = this.trimSlashes(utils.pathname);

        routes.forEach((route, index) => {
            if (path === this.trimSlashes(route)) {
                selectedIndex = index;
                return true;
            }

            links[index].selected = false;
        });

        if (selectedIndex < 0) {
            return;
        }

        links[selectedIndex].selected = true;
    }

    private trimSlashes(str: string) {
        if (!this.utils.isString(str)) {
            return str;
        }

        if (str[0] === '/') {
            str = str.slice(1);
        }

        if (str.length > 0 && str[str.length - 1] === '/') {
            str = str.slice(0, -1);
        }

        return str;
    }
}

register.injectable('helpers', Helpers);
