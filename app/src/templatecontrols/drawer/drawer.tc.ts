import {events, register, routing, ui, web} from 'platypus';
import Home from '../../viewcontrols/home/home.vc';
import Helpers from '../../injectables/helpers/helpers';

export default class DrawerTemplateControl extends ui.TemplateControl {
    replaceWith = 'nav';
    templateString: string = require('./drawer.tc.html');
    hasOwnContext = true;
    context = {
        visible: false,
        links: [
            { title: 'Home', view: Home }
        ]
    };

    constructor(private helpers: Helpers) {
        super();

        this.on('navigated', (ev: events.DispatchEvent, utils: web.UrlUtils) => {
            this.context.visible = false;
            this.helpers.selectRoute(this.context.links, utils);
        });

        this.helpers.selectRoute(this.context.links);
    }
}

register.control('drawer', DrawerTemplateControl, [
    Helpers
]);
