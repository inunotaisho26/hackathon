import {register, controls, storage} from 'platypus';
import BaseViewControl from '../base/base.vc';
import CustomerSvc from '../../services/customer/customer.svc';
import Drawer from '../../templatecontrols/drawer/drawer.tc';

export default class MyLowesViewControl extends BaseViewControl {
    templateString: string = require('./mylowes.vc.html');

    context = {
        email: '',
        password: '',
        processing: false,
        user: <models.ICustomer>null,
        residence: 'House',
        shade: 0,
        convertShade: (shade: number) => {
            switch(shade) {
                case 0:
                    return 'Light';
                case 1:
                    return 'Partial';
                case 2:
                    return 'Filtered';
                case 3:
                    return 'Full';
            }
        }
    };

    email: controls.INamedElement<HTMLInputElement, void>;
    password: controls.INamedElement<HTMLInputElement, void>;

    constructor(protected svc: CustomerSvc, protected storage: storage.LocalStorage, protected drawer: Drawer) {
        super();
    }

    initialize() {
        this.svc.login().then((user) => {
            let context = this.context,
                utils = this.utils;

            if (utils.isString(user.residence)) {
                context.residence = user.residence;
            } else {
                user.residence = context.residence;
            }

            if (utils.isNumber(user.shade)) {
                context.shade = user.shade;
            } else {
                user.shade = context.shade;
            }

            this.context.user = user;
        }).catch(this.utils.noop);
    }

    loaded() {
        this.observe(this.saveUser, 'residence');
        this.observe(this.saveUser, 'shade');
    }

    private saveUser() {
        let context = this.context;
        this.utils.extend(context.user, {
            residence: context.residence,
            shade: context.shade
        });
        this.storage.setItem('customer', JSON.stringify(context.user));
    }

    login() {
        let context = this.context;
        if (context.processing) {
            return;
        }

        this.clear();
        this.notification.hide();

        let isEmpty = this.utils.isEmpty,
            error = false,
            email = context.email,
            password = context.password;

        if (isEmpty(email)) {
            error = true;
            this.dom.addClass(this.email.element, 'invalid');
        }

        if (isEmpty(password)) {
            error = true;
            this.dom.addClass(this.password.element, 'invalid');
        }

        if (error) {
            return;
        }

        context.processing = true;

        this.svc.login(email, password).then((user) => {
            let utils = this.utils,
                store = false;

            if (utils.isString(user.residence)) {
                context.residence = user.residence;
            } else {
                store = true;
                user.residence = context.residence;
            }

            if (utils.isNumber(user.shade)) {
                context.shade = user.shade;
            } else {
                store = true;
                user.shade = context.shade;
            }

            if (store) {
                this.storage.setItem('customer', JSON.stringify(user));
            }

            this.context.user = user;
        }).catch((error) => {
            this.notification.fail('Invalid Login Credentials');
        }).then(() => {
            context.processing = false;
            this.drawer.refreshStore();
        }).catch(this.utils.noop);
    }

    clear() {
        let dom = this.dom;
        dom.removeClass(this.email.element, 'invalid');
        dom.removeClass(this.password.element, 'invalid');
    }

    signOut() {
        this.svc.logout().then(() => {
            this.context.user = null;
        });
    }
}

register.viewControl('mylowes-vc', MyLowesViewControl, [
    CustomerSvc,
    storage.LocalStorage,
    Drawer
]);
