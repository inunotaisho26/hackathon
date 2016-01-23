import {register, controls} from 'platypus';
import BaseViewControl from '../base/base.vc';

export default class MyLowesViewControl extends BaseViewControl {
    templateString: string = require('./mylowes.vc.html');

    context = {
        email: '',
        password: '',
        save: false,
        processing: false,
        user: <models.ICustomer>null
    };

    email: controls.INamedElement<HTMLInputElement, void>;
    password: controls.INamedElement<HTMLInputElement, void>;

    initialize() {
        // try and get customer
    }

    login() {
        let context = this.context;
        if (context.processing) {
            return;
        }

        this.clear();
        let isEmpty = this.utils.isEmpty,
            error = false;

        if (isEmpty(context.email)) {
            error = true;
            this.dom.addClass(this.email.element, 'invalid');
        }

        if (isEmpty(context.password)) {
            error = true;
            this.dom.addClass(this.password.element, 'invalid');
        }

        if (error) {
            return;
        }

        context.processing = true;
    }

    clear() {
        let dom = this.dom;
        dom.removeClass(this.email.element, 'invalid');
        dom.removeClass(this.password.element, 'invalid');
    }
}

register.viewControl('mylowes-vc', MyLowesViewControl);
