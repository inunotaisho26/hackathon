import {App, events, register, routing, web, Compat, Utils, Window} from 'platypus';
import Home from '../viewcontrols/home/home.vc';
import List from '../viewcontrols/list/list.vc';
import Cart from '../viewcontrols/cart/cart.vc';
import MyLowes from '../viewcontrols/mylowes/mylowes.vc';
import FindStore from '../viewcontrols/findstore/findstore.vc';
import Help from '../viewcontrols/help/help.vc';

export default class MyApp extends App {
    constructor(
        router: routing.Router,
        config: web.IBrowserConfig,
        compat: Compat,
        private utils: Utils,
        private window: Window
    ) {
        super();

        router.configure([
            { pattern: '', view: Home },
            { pattern: 'list', view: List },
            { pattern: 'cart', view: Cart },
            { pattern: 'mylowes', view: MyLowes },
            { pattern: 'findstore', view: FindStore },
            { pattern: 'help', view: Help }
        ]);

        if (!compat.ANDROID) {
            return;
        }

        let route: string,
            pressed = false,
            count = 1;

        this.on('backButtonPressed', (ev: plat.events.DispatchEvent) => {
            pressed = true;

            if (!route || route === '/') {
                count--;
            }

            if (count <= 0) {
                ev.preventDefault();
                this.dispatchEvent('shutdown');
            }
        });

        this.on('urlChanged', (ev: plat.events.DispatchEvent, urlUtils: web.UrlUtils) => {
            route = urlUtils.pathname;
            if (pressed) {
                pressed = false;
            } else if (!route || route === '/') {
                count++;
            }
        });
    }

    ready() {
        let _window: any = this.window,
            utils = this.utils,
            isObject = utils.isObject,
            parsePlugin: IParsePlugin = _window.parsePlugin;

        if (isObject(parsePlugin)) {
            let clientKey = /iemobile/i.test(_window.navigator.userAgent) ?
                'Hn2ccSewihGWdORVJeGQ1h6HqOYNOkUpZYsMu35Z' :
                '6mpaXFvZLyLVpjTDyAJZIYWj9g4DlsMajpclQN5r';

            parsePlugin.initialize('ocU4stImPGfv5qv6cGVNCsjO1oq139hGinjfEk5G', clientKey, () => {
                parsePlugin.subscribe('LowesAll');
            });
        }

        utils.defer(() => {
            let navigator: any = _window.navigator,
                splashscreen = isObject(navigator) ? navigator.splashscreen : null;

            if (isObject(splashscreen)) {
                splashscreen.hide();
            }
        }, 1000);
    }

    error(ev: events.ErrorEvent<Error>): void {
        // console.log(ev.error);
    }
}

register.app('app', MyApp, [
    routing.Router,
    web.IBrowserConfig,
    Compat,
    Utils,
    Window
]);

interface IParsePlugin {
    initialize(apiKey: string, clientKey: string, callback?: () => void, error?: (error: any) => void): void;
    getInstallationId(callback: (id: string) => void, error?: (error: any) => void): void;
    getSubscriptions(callback: (subscriptions: any) => void, error?: (error: any) => void): void;
    subscribe(channel: string, callback?: () => void, error?: (error: any) => void): void;
    unsubscribe(channel: string, callback?: () => void, error?: (error: any) => void): void;
}

interface IStatusBarPlugin {
    hide(): void;
    show(): void;
    backgroundColorByHexString(hex: string): void;
}

interface ISplashscreenPlugin {
    hide(): void;
    show(): void;
}
