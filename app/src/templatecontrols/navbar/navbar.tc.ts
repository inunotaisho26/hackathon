import {register, ui, events, web} from 'platypus';
import Helpers from '../../injectables/helpers/helpers';
import Home from '../../viewcontrols/home/home.vc';
import List from '../../viewcontrols/list/list.vc';
import Cart from '../../viewcontrols/cart/cart.vc';
import MyLowes from '../../viewcontrols/mylowes/mylowes.vc';

export default class NavbarTemplateControl extends ui.TemplateControl {
    replaceWith = 'nav';
    templateString: string = require('./navbar.tc.html');
    hasOwnContext = true;

    context = {
        menuSelected: false,
        links: <Array<ILink>>[
            { view: Home },
            { view: List },
            { view: Cart },
            { view: MyLowes }
        ]
    };

    constructor(private helpers: Helpers) {
        super();

        this.on('navigated', (ev: events.DispatchEvent, utils: web.UrlUtils) => {
            this.context.menuSelected = false;
            this.helpers.selectRoute(this.context.links, utils);
        });

        this.helpers.selectRoute(this.context.links);
    }

    onDrawerOpen() {
        this.context.menuSelected = true;
    }

    onDrawerClose() {
        this.context.menuSelected = false;
    }
}

register.control('navbar', NavbarTemplateControl, [
    Helpers
], true);
