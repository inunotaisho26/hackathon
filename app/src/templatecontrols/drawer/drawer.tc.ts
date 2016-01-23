import {events, register, routing, ui, web} from 'platypus';
import Home from '../../viewcontrols/home/home.vc';
import Helpers from '../../injectables/helpers/helpers';
import Navbar from '../navbar/navbar.tc';

export default class DrawerTemplateControl extends ui.TemplateControl {
    replaceWith = 'nav';
    templateString: string = require('./drawer.tc.html');
    hasOwnContext = true;
    context = {
        visible: false,
        links: [
            { title: 'Home', view: Home, icon: 'home' }
        ]
    };

    constructor(private helpers: Helpers, private browser: web.Browser, private navbar: Navbar) {
        super();

        this.on('navigated', (ev: events.DispatchEvent, utils: web.UrlUtils) => {
            this.context.visible = false;
            this.helpers.selectRoute(this.context.links, utils);
        });

        this.helpers.selectRoute(this.context.links);
    }

    loaded() {
        this.observe((newValue) => {
            if (newValue === true) {
                this.navbar.onDrawerOpen();
            } else {
                this.navbar.onDrawerClose();
            }
        }, 'visible');
    }

    dismiss(ev: ui.IGestureEvent) {
        let target = <HTMLAnchorElement>ev.currentTarget,
            url = this.browser.url();

        if (url === target.href) {
            this.context.visible = false;
        }
    }
}

register.control('drawer', DrawerTemplateControl, [
    Helpers,
    web.Browser,
    Navbar
]);
