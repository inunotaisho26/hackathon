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
                return router.generate(link.view);
            }, links),
            selectedIndex = -1;

        if (!this.utils.isObject(utils)) {
            utils = this.browser.urlUtils();
        }

        let path = utils.pathname;

        routes.forEach((route, index) => {
            if (path.indexOf(route) > -1) {
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
}

register.injectable('helpers', Helpers);
