import {events, register, routing, ui, web} from 'platypus';
import Helpers from '../../injectables/helpers/helpers';
import Navbar from '../navbar/navbar.tc';
import FindStore from '../../viewcontrols/findstore/findstore.vc';
import Help from '../../viewcontrols/help/help.vc';

export default class DrawerTemplateControl extends ui.TemplateControl {
    replaceWith = 'nav';
    templateString: string = require('./drawer.tc.html');
    hasOwnContext = true;
    context = {
        visible: false,
        links: [
            { title: 'Find a Store', view: FindStore, icon: 'map-marker' },
            { title: 'Credit Card', view: 'https://lowes.mycreditcard.mobi', icon: 'credit-card', isUrl: true },
            { title: 'Help', view: Help, icon: 'question-circle' }
        ],
        store: {
            name: 'S.E. Austin Lowe\'s',
            status: 'Open today until 9:00 PM'
        }
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
