import {events, register, routing, ui, web} from 'platypus';
import Helpers from '../../injectables/helpers/helpers';
import Navbar from '../navbar/navbar.tc';
import FindStore from '../../viewcontrols/findstore/findstore.vc';
import Help from '../../viewcontrols/help/help.vc';

let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

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
        store: <models.ILocation>null,
        status: ''
    };

    constructor(private helpers: Helpers, private browser: web.Browser, private navbar: Navbar) {
        super();

        this.on('navigated', (ev: events.DispatchEvent, utils: web.UrlUtils) => {
            this.context.visible = false;
            this.helpers.selectRoute(this.context.links, utils);
        });

        this.helpers.selectRoute(this.context.links);
    }

    initialize() {
        this.refreshStore();
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

    refreshStore() {
        let context = this.context;

        // get store
        context.store = <any>{
            storeName: 'Lowe\'s of S.E. Austin, TX',
            dailyHours: {
                saturday: [21600, 75600],
                sunday: [28800, 68400]
            }
        };

        context.status = this.createStatus(context.store);
    }

    dismiss(ev: ui.IGestureEvent) {
        let target = <HTMLAnchorElement>ev.currentTarget,
            url = this.browser.url();

        if (url === target.href) {
            this.context.visible = false;
        }
    }

    private createStatus(store: models.ILocation) {
        let utils = this.utils,
            isObject = utils.isObject;

        if (!(isObject(store) && isObject(store.dailyHours))) {
            return;
        }

        let d = new Date(),
            now = d.getTime(),
            day = d.getDay(),
            seconds = store.dailyHours[days[day]];

        if (!utils.isArray(seconds) || seconds.length < 2) {
            return;
        }

        let first = seconds[0] / 60 / 60,
            second = seconds[1] / 60 / 60;

        d.setHours(first,0,0,0);
        if (now >= d.getTime()) {
            d.setHours(second);
            if (now >= d.getTime()) {
                // store is closed, will open tomorrow
                let nextDay = day === 6 ? 0 : day + 1;
                seconds = store.dailyHours[nextDay];

                if (!utils.isArray(seconds) || seconds.length < 2) {
                    return;
                }

                first = seconds[0] / 60 / 60;

                return `Closed now opens at ${first}:00 AM`;
            }

            // store is open
            return `Open today until ${second - 12}:00 PM`
        }

        return `Closed now opens at ${first}:00 ${first === 12 ? 'PM' : 'AM'}`;
    }
}

register.control('drawer', DrawerTemplateControl, [
    Helpers,
    web.Browser,
    Navbar
]);
